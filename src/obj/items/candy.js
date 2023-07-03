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
        this._initCollider();
        this._initEffect();
        this._initSpawner();
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

    onCollision() {
        this.sprite.onCollision();
        this.effect.onCollision();

        Data.itemQuantity++;
    }

    onLose() {
        this.effect.onLose();
    }

    onFirstSpawn(direction) {
        this.onSpawn(direction);
        this.effect.onFirstSpawn();
    }

    onSpawn(direction) {
        this.spawner.onSpawn(direction);
        this.sprite.onSpawn();
        this.effect.onSpawn();
    }

    update(dt) {
        this.effect.update(dt);
    }
}