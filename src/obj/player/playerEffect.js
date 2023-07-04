import { Texture } from "pixi.js";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import config from "../../../assets/aim/emitter.json"
import * as TWEEN from "@tweenjs/tween.js";

export class PlayerEffect {
    constructor(obj) {
        this.obj = obj;
        this._initEffect();
        this.onReset();
    }

    _initEffect() {
        this._despawnEffect();
        this._flyEffect();
    }

    _despawnEffect() {
        this.despawnEffect = new TWEEN.Tween(this.obj)
            .to({ alpha: 0 }, 2000)
    }

    _flyEffect() {
        let texture = Texture.from("circle");
        this.emitter = new Emitter(this.obj.parent, upgradeConfig(config, [texture]));
        this.emitter.emit = false;
    }

    _updateEmitterPosition() {
        this.emitter.updateSpawnPos(this.obj.position.x, this.obj.position.y)
    }

    _deadEffect(dt) {
        if (this.enableDeadEffect == false) {
            return;
        }

        this.obj.rotation += 0.8 * dt;
    }

    onLose(){
        this.enableDeadEffect = true;
        this.despawnEffect.start();
    }

    onReset() {
        this.enableDeadEffect = false;
        this.despawnEffect.stop();

        this.obj.alpha = 1;
        this.obj.rotation = 0;
    }

    update(dt) {
        this._deadEffect(dt);   
        this._updateEmitterPosition();
        this.emitter.update(dt); 
    }
}