import { AnimatedSprite, Assets, Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../physics/collider";
import { Game } from "../../game";
import { Spike } from "../trap/spike";
import { GameManager } from "../../custom/gameManager";
import * as TWEEN from '@tweenjs/tween.js'


export class Player extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initProperties();
        this._initCollider();
        this._initEffect();
        this.gameManager = GameManager.instance;
    }

    _initCollider() {
        this.collider = new Collider(this.radiousCollider);
        this.addChild(this.collider);
    }

    _initProperties() {
        this.radiousCollider = 40 / Game.ratio;
        this.velocity = { x: 0 / Game.ratio, y: -1.5 / Game.ratio };
        this.gravity = 0.5 / Game.ratio;
        this.jumpForce = 16 / Game.ratio;
        this.direction = { x: 1, y: 1 };
        this.isPlaying = false;
        this.isDie = false;
    }

    _initSprite() {
        this.animateTextures = [Sprite.from(Assets.get("bird2")).texture, Sprite.from(Assets.get("bird1")).texture];

        this.bird = new AnimatedSprite(this.animateTextures);
        this.bird.anchor.set(0.5);
        this.bird.scale.set(0.5 / Game.ratio);
        this.bird.animationSpeed = 0.018 / Game.ratio;
        this.bird.play();
        this.addChild(this.bird);

        this.birdDead = Sprite.from(Assets.get("birdDead"));
        this.birdDead.anchor.set(0.5);
        this.birdDead.scale.set(0.5 / Game.ratio);
    }

    _initEffect() {
        this._despawnEffect();
        //this._flyEffect();
    }

    _despawnEffect() {
        this.fadeTween = new TWEEN.Tween(this.birdDead)
            .to({ alpha: 0 }, 2000)
            .onComplete(() => {
                this.removeChild(this.birdDead);
            })
            .onStop(() => {
                this.birdDead.alpha = 1;
                this.removeChild(this.birdDead);
            });
    }

    _deadEffect(dt) {
        if(this.isDie) {
            this.birdDead.rotation += 0.8 * dt;
        }
    }


    _particleFolowing(x, y) {
        this.emitter.updateOwnerPos(x, y);
    }

    _changeDirection() {
        this.bird.scale.x *= -1;
        this.birdDead.scale.x *= -1;
    }

    onPointerDown() {
        if (!this.isPlaying) {
            this.velocity.x = this.jumpForce / 1.7;
            this.velocity.y = -this.jumpForce;
            this.isPlaying = true;
            this.direction = { x: 1, y: 1 };
        }

        this.velocity.y = -this.jumpForce;
    }

    onCollision(obj) {
        if (obj instanceof Spike) {   
            this.velocity.x = this.jumpForce * 1.5;

            if(this.isDie == false) {
                this.addChild(this.birdDead);
                this.removeChild(this.bird);
                this.isDie = true;
            }

            if (!this.fadeTween.isPlaying()) {
                this.fadeTween.start();
            }          
        }
    }

    _move(dt) {
        if (this.isPlaying == false) {
            return;
        }

        this._limitHozMovement();

        // di chuyển bằng thay đổi pos
        this.velocity.y += this.gravity;

        this.position.x += this.velocity.x * this.direction.x * dt;
        this.position.y += this.velocity.y * this.direction.y * dt;

        this._limitVerMovement();
        this._deadEffect(dt);
        //this._checkPos();
    }

    _checkPos() {
        console.log(this.emitter.spawnPos);
        //console.log(this.emitter.ownerPos);
    }

    // xử lý chạm left or right

    _limitHozMovement() {
        let direction = 1;
        if (this.position.x - this.radiousCollider <= - GameConstant.GAME_WIDTH / Game.ratio / 2) {
            // 1 direction
            direction = 1;
            this.gameManager.emit("nextLevel", direction);
            this.direction.x = 1;
            this._changeDirection();
            this._touchWall();
        }

        if (this.position.x + this.radiousCollider >= GameConstant.GAME_WIDTH / Game.ratio / 2) {
            direction = 0;
            this.gameManager.emit("nextLevel", direction);
            this.direction.x = -1;
            this._changeDirection();
            this._touchWall();
        }
    }

    _touchWall() {
        if (this.velocity.y <= -this.jumpForce * 0.7) {
            this.velocity.y = -this.jumpForce * 0.7;
        } else {
            this.velocity.y = -4 / Game.ratio;
            if (this.isDie) {
                this.velocity.y = 2 / Game.ratio;
            }
        }
    }

    //xử lý chạm top vs bottom
    _limitVerMovement() {
        const topLimit = - Game.app.view.height / 2 + Game.app.view.height / 14;
        const bottomLimit = Game.app.view.height * 2.5 / 7;

        if (this.position.y - this.radiousCollider <= topLimit) {
            this.position.y = topLimit + this.radiousCollider;
            if (this.isDie) {
                this.velocity.y = this.jumpForce * 1.5;
            }
        } else if (this.position.y + this.radiousCollider >= bottomLimit) {
            this.position.y = bottomLimit - this.radiousCollider;
            if (this.isDie) {
                this.velocity.y = - this.jumpForce * 1.5;
            }
        }
    }

    _moveInMenu(dt) {
        if (this.isPlaying) {
            return;
        }

        if (this.position.y >= this.radiousCollider) {
            this.direction.y = 1;
        } else if (this.position.y <= -this.radiousCollider) {
            this.direction.y = -1;
        }

        this.position.y += this.velocity.y * this.direction.y * dt;
    }

    onReset() {
        this.addChild(this.bird);
        this.isDie = false;
        this.isPlaying = false;
        this.velocity = { x: 0 / Game.ratio, y: -1.5 / Game.ratio };
        this.direction = { x: 1, y: 1 };
        this.position = { x: 0, y: 0 };
        this.birdDead.scale.x = 0.5 / Game.ratio;
        this.bird.scale.x = 0.5 / Game.ratio;
        this.fadeTween.stop();
    }

    update(dt) {
        this._move(dt);
        this._moveInMenu(dt);
        TWEEN.update();
    }
}
