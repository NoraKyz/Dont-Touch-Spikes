import { Graphics } from "pixi.js";

export class Collider extends Graphics {
    constructor(radius) {
        super();
        this.radius = radius;
        this.enable = true;
        this._initCollider();
    }

    _initCollider() {
        this.beginFill(0x000000, 0);
        this.drawCircle(0, 0, this.radius);
        this.endFill();
    }
}