import { Assets, Container, Sprite } from "pixi.js";

export class Spike extends Container {
    constructor() {
        super();
        this._initSprite();
        this.collider = null;
    }

    _initSprite(color = 0x808080) {
        this.size = 70; // Kích thước cạnh tam giác
        this.spike = Sprite.from(Assets.get("spike"));
        this.spike.anchor.set(0.5);
        this.spike.scale.set(1.15);

        this.addChild(this.spike);
    }

    changeColor(color) {
        this.spike.tint = color;
    }
}