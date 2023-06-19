import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Player extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initProperties();
    }

    _initProperties() {
        this.velocity = { x: 4, y: -10 };
        this.isPlaying = true;
        this.gravity = 0.5;
        this.jumpForce = 10;
    }

    _initSprite() {
        this.bird = new Graphics();
        this.bird.lineStyle(0);
        this.bird.beginFill(0xd19a52, 1);
        this.bird.drawCircle(0, 0, 40);
        this.bird.endFill();
        this.addChild(this.bird);
    }

    onPointerTap() {
        if (!this.isPlaying) {
            this.velocity.x = this.jumpForce;
            this.velocity.y = -this.jumpForce;
            this.isPlaying = true;
        }

        this.velocity.y = -this.jumpForce;
    }

    _move(dt) {
        if (this.isPlaying == false) {
            return;
        }

        this.velocity.y += this.gravity;

        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    }

    update(dt) {
        this._move(dt);
    }
}
