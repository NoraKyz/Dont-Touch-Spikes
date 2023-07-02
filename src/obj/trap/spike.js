import { Container, Graphics } from "pixi.js";
import { Game } from "../../game";

export class Spike extends Container {
    constructor() {
        super();
        this._initSprite();
        this.collider = null;
    }

    _initSprite(color = 0x808080) {
        this.size = 70 / Game.ratio; // Kích thước cạnh tam giác
        this.spike = new Graphics();
        this.spike.beginFill(color);

        const halfSize = this.size / 2;
        const x1 = -halfSize;
        const y1 = 0;
        const x2 = halfSize;
        const y2 = 0;
        const x3 = 0;
        const y3 = -halfSize * Math.sqrt(1.5);

        this.spike.moveTo(x1, y1);
        this.spike.lineTo(x2, y2);
        this.spike.lineTo(x3, y3);
        this.spike.lineTo(x1, y1);

        this.spike.endFill();

        this.addChild(this.spike);
    }

    changeColor(color){
        //this.spike.tint = color;
        
    }
}