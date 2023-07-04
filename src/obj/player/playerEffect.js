import {Assets, Texture} from "pixi.js";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import config from "../../../assets/aim/emitter.json";
import * as TWEEN from "@tweenjs/tween.js";
import {Game} from "../../game";

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
    this.despawnEffect = new TWEEN.Tween(this.obj).to({ alpha: 0 }, 2000);
  }

  _flyEffect() {
    let texture = Texture.from("circle");
    let cusConfig = config;
    cusConfig.scale = {
      start: 0.5 / Game.ratio,
        end: 0.035 / Game.ratio,
      minimumScaleMultiplier: 1,
    }

    this.emitter = new Emitter(
      this.obj.parent,
      upgradeConfig(cusConfig, [texture])
    );
    this.emitter.emit = false;
  }

  _updateParticles() {
    this.emitter.updateSpawnPos(this.obj.position.x, this.obj.position.y);
  }

  onPointerDown() {
    this.emitter.playOnce();
  }

  onPointerUp() {
    setTimeout(() => {
      console.log(this.emitter.particleCount);
      if(this.emitter.particleCount <= 8) {
          this.emitter.emit = false;
      }
    }, 100);
    console.log(this.emitter.emit);
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

  onReset() {
    this.enableDeadEffect = false;
    this.despawnEffect.stop();
    this.obj.alpha = 1;
    this.obj.rotation = 0;
  }

  update(dt) {
    this._deadEffect(dt);
    this.emitter.update(dt * 0.1);
    this._updateParticles();
  }
}

