import { Assets, Container, Sprite } from "pixi.js";
import { SkinManager } from "../skin/skinManager.js"

export class PlayerSprite extends Container {
    constructor(parent) {
        super();
        this.parent = parent;
        this._initSkin();
        this._initSprite();
        this.onReset();
    }

    _initSkin() {
        this.skinManager = SkinManager.instance;
        this.skin = this.skinManager.currentSkin;
    }

    _initSprite() {
        this._initLiveSprite();
        this._initDeadSprite();
    }

    _initLiveSprite() {
        this.live = new Container();
        this.live.sprite1 = Sprite.from(Assets.get(this.skin.texture1));
        this.live.sprite1.anchor.set(0.5);
        this.live.sprite1.scale.set(0.2);
        this.live.addChild(this.live.sprite1);
        this.live.sprite1.visible = true;

        this.live.sprite2 = Sprite.from(Assets.get(this.skin.texture2));
        this.live.sprite2.anchor.set(0.5);
        this.live.sprite2.scale.set(0.2);
        this.live.addChild(this.live.sprite2);
        this.live.sprite2.visible = false;

        this.live.sprite3 = Sprite.from(Assets.get(this.skin.texture3));
        this.live.sprite3.anchor.set(0.5);
        this.live.sprite3.scale.set(0.2);
        this.live.addChild(this.live.sprite3);
        this.live.sprite3.visible = false;

        this.addChild(this.live);
    }

    _initDeadSprite() {
        this.birdDead = Sprite.from(Assets.get("birdDead"));
        this.birdDead.anchor.set(0.5);
        this.birdDead.scale.set(0.5);
        this.addChild(this.birdDead);
    }
    onPointerDown() {
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

    updateSkin() {
        this.skin = this.skinManager.currentSkin;
        this.live.sprite1.texture = Assets.get(this.skin.texture1);
        this.live.sprite2.texture = Assets.get(this.skin.texture2);
        this.live.sprite3.texture = Assets.get(this.skin.texture3);
    }

    changeDirection() {
        this.scale.x *= -1;
    }

    update(dt) {
        if (this.parent.isPlaying) {
            if (this.parent.movement.velocity.y < 1 && this.parent.movement.velocity.y > -1) {
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