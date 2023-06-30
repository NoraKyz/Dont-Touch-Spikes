import { Graphics } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export const ColliderTag = Object.freeze({
    Player: "player",
    Trap: "trap",
    Item: "item",
    Default: "default"
});

export class Collider extends Graphics {
    constructor(radius) {
        super();
        this.radius = radius;
        this.enable = true;
        this.tag = ColliderTag.Default;
        this._initCollider();
    }

    _initCollider() {
        this.beginFill(0x000000, GameConstant.DEBUG_DRAW_COLLIDER);
        this.drawCircle(0, 0, this.radius);
        this.endFill();
    }
}