import {AnimatedSprite, Assets, Container, Graphics, Sprite} from "pixi.js";
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
        this.gameManager = GameManager.instance;
    }
    _initCollider() {
        this.collider = new Collider(this.radiousCollider);
        this.addChild(this.collider);
    }

    _initProperties() {
        this.radiousCollider = 40;
        this.velocity = { x: 0, y: -1.5 };
        this.gravity = 0.5;
        this.jumpForce = 12;
        this.direction = { x: 1, y: 1 };
        this.isPlaying = false;
        this.isDie = false;
    }

    _initSprite() {
        this.animateTextures = [Sprite.from(Assets.get("bird1")).texture, Sprite.from(Assets.get("bird2")).texture];
        this.bird = new AnimatedSprite(this.animateTextures);
        this.bird.anchor.set(0.5);
        this.bird.scale.set(0.5);
        this.bird.animationSpeed = 0.018;
        this.bird.play();
        this.addChild(this.bird);
    }

    _changeDirection() {
        this.bird.scale.x *= -1;
    }

    onPointerDown() {
        if (!this.isPlaying) {
            this.velocity.x = this.jumpForce / 1.3;
            this.velocity.y = -this.jumpForce;
            this.isPlaying = true;
            this.direction = { x: 1, y: 1 };
        }

        this.velocity.y = -this.jumpForce;
    }

    onCollision(obj) {
        if (obj instanceof Spike) {
            this.velocity.x = this.jumpForce * 1.5;
            this.isDie = true;
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
    }

    // xử lý chạm left or right
    _limitHozMovement() {
        if (this.position.x - this.radiousCollider <= - GameConstant.GAME_WIDTH / 2) {
            this.direction.x = 1;
            this._changeDirection();
            this._touchWall();
        }

        if (this.position.x + this.radiousCollider >= GameConstant.GAME_WIDTH / 2) {
            this.direction.x = -1;
            this._changeDirection();
            this._touchWall();
        }
    }

    _touchWall() {
        this.gameManager.emit("nextLevel");

        if (this.velocity.y <= -this.jumpForce * 0.7) {
            this.velocity.y = -this.jumpForce;
        } else {
            this.velocity.y = -4;
            if (this.isDie) {
                this.velocity.y = 2;
                this._isDead();
            }
        }
    }

    //xử lý chạm top vs bottom
    _limitVerMovement() {
        const topLimit = - Game.app.view.height / 2 + Game.app.view.height / 14;
        const bottomLimit = Game.app.view.height * 2.5 / 7;

        if (this.position.y - this.radiousCollider <= topLimit
        ) {
            this.position.y = topLimit + this.radiousCollider;
        } else if (this.position.y + this.radiousCollider >= bottomLimit) {
            this.position.y = bottomLimit - this.radiousCollider;
            if (this.isDie) {
                this.velocity.y = - this.jumpForce * 1.5;
                this._isDead();
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

    _isDead() {
        this.fadeTween = new TWEEN.Tween(this.bird)
        .to({ alpha: 0 }, 2000)
            .onComplete(() => {
                this.removeChild(this.bird);
            });
        this.fadeTween.start();
    }

    update(dt) {
        this._move(dt);
        this._moveInMenu(dt);
        TWEEN.update();
    }
}
