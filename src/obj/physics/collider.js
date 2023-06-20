import { Container, Graphics } from "pixi.js";

export class Collider extends Graphics {
    constructor(radious) {
        super();
        this._initCollider(radious);
    }

    _initCollider(radious) {
        this.beginFill(0x000000, 0)
        this.drawCircle(0, 0, radious);
        this.endFill();
    }
}