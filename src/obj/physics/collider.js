<<<<<<< HEAD
import { Container } from "pixi.js";


export class Collider extends Container{
   
=======
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
>>>>>>> c423eab82626f458e1c4bf8db65931f4c04137d7
}