import { AnimatedSprite, Assets, Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";
import * as TWEEN from "@tweenjs/tween.js";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import config from "../../../assets/aim/emitter.json"

export class PlayerSprite extends Container {
    constructor() {
        super();
        this._initTexture();
        this._initSprite();
        this._initEffect();
        this.onReset();
    }

    _initSprite() {
        this._initLiveSprite();
        this._initDeadSprite();
    }

    _initTexture() {
        this.flyTextures = [Assets.get("bird2"), Assets.get("bird1")];
    }

    _initLiveSprite() {
        this.live = new AnimatedSprite(this.flyTextures);
        this.live.anchor.set(0.5);
        this.live.scale.set(0.5 / Game.ratio);
        this.live.animationSpeed = 0.018 / Game.ratio;
        this.live.play();
        this.addChild(this.live);
    }

    _initDeadSprite() {
        this.birdDead = Sprite.from(Assets.get("birdDead"));
        this.birdDead.anchor.set(0.5);
        this.birdDead.scale.set(0.5 / Game.ratio);
        this.addChild(this.birdDead);
    }

    _initEffect() {
        this._despawnEffect();
        //this._flyEffect();
    }

    _despawnEffect() {
        this.despawnEffect = new TWEEN.Tween(this)
            .to({ alpha: 0 }, 2000)
    }

    _flyEffect() {
        let texture = Texture.from("circle");
        this.emitter = new Emitter(this, upgradeConfig(config, [texture]));
        this.emitter.emit = true;
        this.emitter.playOnce();
    }

    _deadEffect(dt) {
        if (this.enableDeadEffect) {
            this.rotation += 0.8 * dt;
        }
    }

    onLose() {
        this.enableDeadEffect = true;
        this.live.visible = false;
        this.birdDead.visible = true;
        this.despawnEffect.start();
    }

    onReset() {
        this.enableDeadEffect = false;
        this.live.visible = true;
        this.birdDead.visible = false;      
        this.despawnEffect.stop();

        //
        this.rotation = 0;
        this.scale.x = 1;
        this.alpha = 1;
    }

    changeDirection() {
        this.scale.x *= -1;
    }

    update(dt) {
        this._deadEffect(dt);
        TWEEN.update();
        //this.emitter.update(dt);
    }
}