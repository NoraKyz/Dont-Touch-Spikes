import { AnimatedSprite, Assets, Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";

export class PlayerSprite extends Container {
    constructor(parent) {
        super();
        this.parent = parent;
        this._initTexture();
        this._initSprite();
        this.onReset();
    }

    _initTexture() {
        this.flyTextures = [Assets.get("bird2"), Assets.get("bird1"), Assets.get("bird3")];
    }

    _initSprite() {
        this._initLiveSprite();
        this._initDeadSprite();
    }  

    _initLiveSprite() {
        this.live = new Container();
        this.live.sprite1 = Sprite.from(Assets.get("bird1"));
        this.live.sprite1.anchor.set(0.5);
        this.live.sprite1.scale.set(0.2);
        this.live.addChild(this.live.sprite1);
        this.live.sprite1.visible = true;

        this.live.sprite2 = Sprite.from(Assets.get("bird2"));
        this.live.sprite2.anchor.set(0.5);
        this.live.sprite2.scale.set(0.2);
        this.live.addChild(this.live.sprite2);
        this.live.sprite2.visible = false;

        this.live.sprite3 = Sprite.from(Assets.get("bird3"));
        this.live.sprite3.anchor.set(0.5);
        this.live.sprite3.scale.set(0.2);
        this.live.addChild(this.live.sprite3);
        this.live.sprite3.visible = false;

        this.addChild(this.live);
    }

    _initDeadSprite() {
        this.birdDead = Sprite.from(Assets.get("birdDead"));
        this.birdDead.anchor.set(0.5);
        this.birdDead.scale.set(0.5 / Game.ratio);
        this.addChild(this.birdDead);
    } 
    onPointerDown(){
        //console.log(this.parent.movement);
        this.live.sprite1.visible = false;
        this.live.sprite2.visible = false;
        this.live.sprite3.visible = true;
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
    update(dt){
        //console.log(this.parent.movement.velocity.y);
        if(this.parent.isPlaying){
            if(this.parent.movement.velocity.y < 1 && this.parent.movement.velocity.y > -1){
                this.live.sprite1.visible = true;
                this.live.sprite2.visible = false;
                this.live.sprite3.visible = false;
            }
        } else {
            if (this.parent.position.y >= this.parent.radiousCollider) {
                this.live.sprite1.visible = true;
                this.live.sprite2.visible = false;
                this.live.sprite3.visible = false;
            } else if (this.parent.position.y <= -this.parent.radiousCollider) {
                this.live.sprite1.visible = false;
                this.live.sprite2.visible = true;
                this.live.sprite3.visible = false;
            }
        }
    }
}