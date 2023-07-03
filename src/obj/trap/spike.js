import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../../game";

export class Spike extends Container {
    constructor() {
        super();
        this._initSprite();
        this.collider = null;
    }

    _initSprite(color = 0x808080) {
        this.size = 70 / Game.ratio; // Kích thước cạnh tam giác
        this.spike = Sprite.from(Assets.get("spike"));

        this.addChild(this.spike);
    }

    changeColor(color){
        //this.spike.tint = color;
        
    }
}