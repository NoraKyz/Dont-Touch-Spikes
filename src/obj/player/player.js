import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Player extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initProperties();
    }

    _initProperties() {
        this.radiousCollider = 40;
        this.velocity = { x: 0, y: -2 };
        this.isPlaying = false;
        this.gravity = 0.5;
        this.jumpForce = 12;
    }

    _initSprite() {
        this.bird = new Graphics();
        this.bird.lineStyle(0);
        this.bird.beginFill(0xd19a52, 1);
        this.bird.drawCircle(0, 0, 40);
        this.bird.endFill();
        this.addChild(this.bird);
    }

    onPointerDown() {
        if (!this.isPlaying) {
            this.velocity.x = this.jumpForce / 1.3;
            this.velocity.y = -this.jumpForce;
            this.isPlaying = true;
        }

        this.velocity.y = -this.jumpForce;
    }

    _move(dt) {
        if (this.isPlaying == false) {
            return;
        }

        if (this.position.x - this.radiousCollider <= - GameConstant.GAME_WIDTH / 2 ||
            this.position.x + this.radiousCollider >= GameConstant.GAME_WIDTH / 2) {
            this.velocity.x *= -1;
            this.velocity.y = -4;
        }

        this.velocity.y += this.gravity;

        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    }

    _moveInMenu(dt) {
        if (this.isPlaying) {
            return;
        }

        if (this.position.y > this.radiousCollider * 2 ||
            this.position.y <= -this.radiousCollider * 2) {
            this.velocity.y *= -1;
        }

        this.position.y += this.velocity.y * dt;
    }

    update(dt) {
        this._move(dt);
        this._moveInMenu(dt);
    }
}
