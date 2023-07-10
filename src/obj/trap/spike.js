import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { SpikeSprite } from "./spikeSprite";
import { SpikeMovement } from "./spikeMovement";

export class Spike extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initColliders();
        this._initMovement();
    }

    _initSprite() {
        this.sprite = new SpikeSprite();
        this.addChild(this.sprite);
    }

    _initColliders() {
        let colliderRadious = 25 ;
        let collider = new Collider(colliderRadious);
        this.collider = collider;
        this.collider.position.y = 10 ;
        this.addChild(collider);
    }
    
    _initMovement(){
        this.target = {x: 0};
        this.movement = new SpikeMovement(this, this.target);
    }
}