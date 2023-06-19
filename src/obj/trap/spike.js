import { Container, Graphics } from "pixi.js";

export class Spike extends Container {
    constructor() {
        super();
        this._initSprite();
    }

    _initSprite() {
        const size = 70; // Kích thước cạnh tam giác
        this.spike = new Graphics();
        this.spike.beginFill(0x787b80);

        const halfSize = size / 2;
        const x1 = -halfSize;
        const y1 = 0;
        const x2 = halfSize;
        const y2 = 0;
        const x3 = 0;
        const y3 = -halfSize * Math.sqrt(3);

        this.spike.moveTo(x1, y1);
        this.spike.lineTo(x2, y2);
        this.spike.lineTo(x3, y3);
        this.spike.lineTo(x1, y1);

        this.spike.endFill();

        this.addChild(this.spike);
    }
}