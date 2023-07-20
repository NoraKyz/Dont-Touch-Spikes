import { Texture } from "pixi.js";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import config from "../../../assets/aim/flyParticle.json";
import * as TWEEN from "@tweenjs/tween.js";
import { SkinManager } from "../skin/skinManager";

export class PlayerEffect {
    constructor(obj) {
        this.obj = obj;
        this._initSkin();
        this._initEffect();
        this.onReset();
    }

    _initSkin() {
        this.skinManager = SkinManager.instance;
        this.skin = this.skinManager.currentSkin;
    }

    _initEffect() {
        this._despawnEffect();
        this._flyEffect();
    }

    _despawnEffect() {
        this.despawnEffect = new TWEEN.Tween(this.obj).to({ alpha: 0 }, 2000);
    }

    _flyEffect() {
        let texture = Texture.from(this.skin.particleImage);

        this.cusConfig = config;
        this.cusConfig.color = this.skin.particleColor;      

        this.emitter = new Emitter(
            this.obj.parent,
            upgradeConfig(this.cusConfig, [texture])
        );
        this.emitter.emit = false;
    }

    _updateParticles() {
        this.emitter.updateSpawnPos(this.obj.position.x, this.obj.position.y);
    }

    onPointerDown() {
        this.emitter.playOnce();
    }

    _deadEffect(dt) {
        if (this.enableDeadEffect == false) {
            return;
        }
        this.obj.rotation += 0.8 * dt;
    }

    onLose() {
        this.enableDeadEffect = true;
        this.despawnEffect.start();
        this.emitter.emit = false;
    }

    onWin(){
        this.despawnEffect.start();
        this.emitter.emit = false;
    }

    onReset() {
        this.enableDeadEffect = false;
        this.despawnEffect.stop();
        this.obj.alpha = 1;
        this.obj.rotation = 0;
    }

    updateSkin(skin = this.skinManager.currentSkin) {
        this.skin = skin;
        let texture = Texture.from(this.skin.particleImage);

        this.cusConfig = config;
        this.cusConfig.color = this.skin.particleColor; 
        
        this.emitter = new Emitter(
            this.obj.parent,
            upgradeConfig(this.cusConfig, [texture])
        );
        this.emitter.emit = false;
    }

    update(dt) {
        this._deadEffect(dt);
        this.emitter.update(dt * 0.1);
        this._updateParticles();
    }
}


