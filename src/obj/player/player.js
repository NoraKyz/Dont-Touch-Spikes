import { Container, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../physics/collider";
import { Game } from "../../game";
import { Spike } from "../trap/spike";
import { GameManager } from "../../custom/gameManager";
import * as TWEEN from '@tweenjs/tween.js'
import { PlayerSprite } from "./playerSprite";


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
        this.radiousCollider = 40 / Game.ratio;
        this.velocity = { x: 0 / Game.ratio, y: -1.5 / Game.ratio };
        this.gravity = 0.5 / Game.ratio;
        this.jumpForce = 12 / Game.ratio;
        this.direction = { x: 1, y: 1 };
        this.isPlaying = false;
        this.isDie = false;
    }

    _initSprite() {
        this.playerSprite = new PlayerSprite();
        this.addChild(this.playerSprite);
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
            this.onLose();
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
        let direction = 1;
        if (this.position.x - this.radiousCollider <= - GameConstant.GAME_WIDTH / Game.ratio / 2) {
            direction = 1;
            this.gameManager.emit("nextLevel", direction);
            this.direction.x = 1;
            this.playerSprite.changeDirection();
            this._touchWall();
        }

        if (this.position.x + this.radiousCollider >= GameConstant.GAME_WIDTH / Game.ratio / 2) {
            direction = 0;
            this.gameManager.emit("nextLevel", direction);
            this.direction.x = -1;
            this.playerSprite.changeDirection();
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

    onLose() {
        if (this.isDie == false) {
            this.playerSprite.onLose();
            this.isDie = true;
        }
    }

    onReset() {
        this.isDie = false;
        this.isPlaying = false;
        this.playerSprite.onReset();
        this.velocity = { x: 0 / Game.ratio, y: -1.5 / Game.ratio };
        this.direction = { x: 1, y: 1 };
        this.position = { x: 0, y: 0 };
    }

    update(dt) {
        this._move(dt);
        this._moveInMenu(dt);
        this.playerSprite.update(dt);
    }
}
