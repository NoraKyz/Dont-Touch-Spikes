import * as TWEEN from "@tweenjs/tween.js";
import { Game } from "../../game";

export class CandyEffect {
    constructor(obj) {
        this.obj = obj;
        this._initEffect();
        this._initProperties();
    }

    _initProperties(){
        this.speed = 1 / Game.ratio;
        this.direction = 1;
        this.distance = 20 / Game.ratio;

        this.highestPos = this.obj.y - this.distance;
        this.lowestPos = this.obj.y + this.distance;
    }

    _initEffect() {
        this._spawnEffect();
        this._despawnEffect();
        this._eatingEffect();
    }

    _spawnEffect() {
        this.spawnEffect = new TWEEN.Tween(this.obj)
            .to({ alpha: 1 }, 2000)
    }

    _despawnEffect() {
        this.despawnEffect = new TWEEN.Tween(this.obj)
            .to({ alpha: 0 }, 2000)
    }

    _eatingEffect() {

    }

    _moveEffect(dt){
        if (this.obj.y < this.highestPos) this.direction = 1;
        else if (this.obj.y > this.lowestPos) this.direction = -1;
        this.obj.y += this.speed * this.direction * dt;
    }

    onEaten() {
        this.highestPos = this.obj.y - this.distance;
        this.lowestPos = this.obj.y + this.distance;
    }   

    onSpawn() {
        this.spawnEffect.start();
    }

    onLose() {
        this.despawnEffect.start();
    }

    update(dt) {
        this._moveEffect(dt);
    }
}