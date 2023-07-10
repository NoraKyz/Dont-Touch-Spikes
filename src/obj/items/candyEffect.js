import * as TWEEN from "@tweenjs/tween.js";
import { Game } from "../../game";

export class CandyEffect {
    constructor(obj) {
        this.obj = obj;
        this._initProperties();
        this._initEffect();
    }

    _initProperties() {
        this.speed = 1 ;
        this.direction = 1;
        this.distance = 20 ;
    }

    _initEffect() {
        this._spawnEffect();
        this._despawnEffect();
    }

    _spawnEffect() {
        this.spawnEffect = new TWEEN.Tween(this.obj)
            .to({ alpha: 1 }, 2000);
    }

    _despawnEffect() {
        this.despawnEffect = new TWEEN.Tween(this.obj)
            .to({ alpha: 0 }, 2000);
    }

    _eatingEffect() {
        this.targetY = this.obj.y - 80 ;
        this.moveAddNumber = new TWEEN.Tween(this.obj)
            .to({ y: this.targetY, alpha: 0 }, 1000);
        this.moveAddNumber.start();
    }

    _moveEffect(dt) {
        if (this.obj.collider.enabled == false) {
            return; // Candy is eaten
        }

        if (this.obj.y < this.highestPos) this.direction = 1;
        else if (this.obj.y > this.lowestPos) this.direction = -1;
        this.obj.y += this.speed * this.direction * dt;
    }

    onCollision() {
        this._eatingEffect();
    }

    onFirstSpawn() {
        this.obj.alpha = 0;
        this.spawnEffect.start();
    }

    onSpawn() {
        this.obj.alpha = 1;
        this.highestPos = this.obj.y - this.distance;
        this.lowestPos = this.obj.y + this.distance;
    }

    onLose() {
        this.despawnEffect.start();
    }

    update(dt) {
        this._moveEffect(dt);
    }
}