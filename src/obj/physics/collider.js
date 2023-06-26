import { Graphics } from "pixi.js";
import { Game } from "../../game";

export class Collider extends Graphics {
    constructor(radious) {
        super();
        this.radious = radious;
        this._initCollider();
    }

    _initCollider(radious) {
        this.beginFill(0x000000, 0)
        this.drawCircle(0, 0, this.radious);
        this.endFill();
    }
}