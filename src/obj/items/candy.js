import { Container } from "pixi.js";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { Data } from "../../data";
import { CandySprite } from "./candySprite";
import { CandyEffect } from "./candyEffect";
import { CandySpawner } from "./candySpawner";

/*
    Class tổng của candy
    Gọi method trong candy = tất cả method trong các class con
*/

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
        const colliderRadious = 18 ;
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
        this.collider.enabled = false;
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
        this.collider.enabled = true;
        this.spawner.onSpawn(direction);
        this.sprite.onSpawn();
        this.effect.onSpawn();
    }

    update(dt) {
        this.effect.update(dt);
    }
}