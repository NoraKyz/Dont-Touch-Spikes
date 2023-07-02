import { Container } from "pixi.js";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { Data } from "../../data";
import { CandySprite } from "./candySprite";
import { CandyEffect } from "./candyEffect";
import { CandySpawner } from "./candySpawner";

export class Candy extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initProperties();
        this._initCollider();
        this._initEffect();
        this._initSpawner();      
    }

    _initProperties() {
        this.enableEating = true;
    }

    _initSprite() {
        this.sprite = new CandySprite();
        this.addChild(this.sprite);
    }

    _initCollider() {
        const colliderRadious = 18 / Game.ratio;
        this.collider = new Collider(colliderRadious);
        this.addChild(this.collider);
    }

    _initEffect() {
        this.effect = new CandyEffect(this);
    }

    _initSpawner() {
        this.spawner = new CandySpawner(this);
    }

    onEaten() {    
        this.enableEating = false; 

        this.sprite.onEaten();    
        Data.itemQuantity++; // Gọi ở chỗ khác
    }  

    onNextLevel() {
        this.enableEating = true;

        this.sprite.onNextLevel();    
    }

    onLose() {
        this.effect.onLose();
    }

    onSpawn(direction = 1){
        this.spawner.onSpawn(direction);
        this.effect.onSpawn();
    }

    update(dt) {
        this.effect.update(dt);
    }
}