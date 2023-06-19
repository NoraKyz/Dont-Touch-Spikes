import { Container, Graphics, Sprite, Texture } from "pixi.js";

export class Player extends Container {
    constructor() {
        super();
        this._initSprite();
    }

    _initProperties() {
        
    }

    _initSprite() {
        this.bird = new Graphics();
        this.bird.lineStyle(1);
        this.bird.beginFill(0xDE3249, 1);
        this.bird.drawCircle(0,0,20);
        this.bird.endFill();
        this.addChild(this.bird);

        
    }

    _move() {

    }

    update() {
        this._move();
    }
}