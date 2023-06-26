import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../physics/collider";
import { Game } from "../../game";

export class Player extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initProperties();
        this._initCollider();
    }

    _initCollider() {
        this.collider = new Collider(this.radiousCollider);
        this.addChild(this.collider);
    }

    _initProperties() {
        this.radiousCollider = 40;
        this.velocity = { x: 0, y: -0.5 };
        this.isPlaying = false;
        this.gravity = 0.5;
        this.jumpForce = 12;
        this.direction = { x: 1, y: 1 };
    }

    _initSprite() {
        this.bird = new Graphics();
        this.bird.lineStyle(0);
        this.bird.beginFill(0xd19a52, 1);
        this.bird.drawCircle(0, -Game.app.view.width/14, 40);
        this.bird.endFill();
        this.addChild(this.bird);
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

    _move(dt) {
        if (this.isPlaying == false) {
            return;
        }
        // cham tuong
        if (this.position.x - this.radiousCollider <= - GameConstant.GAME_WIDTH / 2
        ) {
            this.direction.x = 1;
            if (this.velocity.y <= 0) {
                this.velocity.y = -12
            } else {
                this.velocity.y = -4;
            }
        } else if (this.position.x + this.radiousCollider >= GameConstant.GAME_WIDTH / 2) {
            this.direction.x = -1;
            if (this.velocity.y <= 0) {
                this.velocity.y = -12
            } else {
                this.velocity.y = -4;
            }
        }

        this.velocity.y += this.gravity;

        this.position.x += this.velocity.x * this.direction.x * dt;
        this.position.y += this.velocity.y * this.direction.y * dt;
    }

    _moveInMenu(dt) {
        if (this.isPlaying) {
            return;
        }

        if (this.position.y >= this.radiousCollider/4) {
            this.direction.y = 1;
        } else if (this.position.y <= -this.radiousCollider/4) {
            this.direction.y = -1;
        }

        this.position.y += this.velocity.y * this.direction.y * dt;
    }

    update(dt) {
        this._move(dt);
        this._moveInMenu(dt);
    }
}
