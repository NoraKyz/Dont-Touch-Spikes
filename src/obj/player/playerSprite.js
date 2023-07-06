import { AnimatedSprite, Assets, Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";

export class PlayerSprite extends Container {
    constructor() {
        super();
        this._initTexture();
        this._initSprite();
        this.onReset();
    }

    _initTexture() {
        this.flyTextures = [Assets.get("bird2"), Assets.get("bird1")];
    }

    _initSprite() {
        this._initLiveSprite();
        this._initDeadSprite();
    }  

    _initLiveSprite() {
        this.live = new AnimatedSprite(this.flyTextures);
        this.live.anchor.set(0.5);
        this.live.scale.set(0.2 / Game.ratio);
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

    onLose() {
        this.live.visible = false;
        this.birdDead.visible = true;
    }

    onReset() {
        this.live.visible = true;
        this.birdDead.visible = false;      
       
        this.scale.x = 1;    
    }

    changeDirection() {
        this.scale.x *= -1;
    }
}