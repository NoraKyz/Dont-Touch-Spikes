import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";

export class SkinCard extends Container {
    constructor(skin) {
        super();     
        this._initProperties(skin);
        this._initSprite();
    }

    _initProperties(skin) {
        this.texture = skin.texture1;
        this.cost =  skin.cost;
        this.enabled = skin.enabled;
    }

    _initSprite() {
        this._spriteLocked();
        this._spriteUnlocked();

        if(this.enabled) {
            this.unlocked.visible = true;
            this.locked.visible = false;
            
        } else {
            this.unlocked.visible = false;
            this.locked.visible = true;
        }
    }

    _spriteUnlocked() {
        this.unlocked = new Container();
        this.unlocked.cursor = "pointer";
        this.unlocked.eventMode = 'static';
        this.unlocked.on("pointerdown", () => this.onSetSkin());

        this.bg1 = new Graphics();
        this.bg1.beginFill(0xFFFFFF);
        this.bg1.drawRoundedRect(-160, -55, 320, 110, 18);
        this.bg1.endFill();
        this.unlocked.addChild(this.bg1);

        this.skin = new Sprite(this.texture);
        this.skin.anchor.set(0.5);
        this.skin.scale.set(0.2);
        this.unlocked.addChild(this.skin);

        this.addChild(this.unlocked);
    }

    _spriteLocked() {
        this.locked = new Container();
        this.locked.cursor = "pointer";
        this.locked.eventMode = 'static';
        this.locked.on("pointerdown", () => this.onGetSkin());

        this.bg2 = new Graphics();
        this.bg2.beginFill(0xFF8207);
        this.bg2.drawRoundedRect(-160, -55, 320, 110, 18);
        this.bg2.endFill();
        this.locked.addChild(this.bg2);

        this.icon = new Sprite(Assets.get("candy"));
        this.icon.anchor.set(0.5);
        this.icon.scale.set(1.5);
        this.icon.position.set(-80, 0);
        this.locked.addChild(this.icon);

        this.price = new Text(this.cost.value, {
            fill: "#FFFFFF",
            fontFamily: "Blissful Thinking",
            fontSize: 70,
            fontWeight: "lighter",
            letterSpacing: 1 ,
        });
        this.price.anchor.set(0.5);
        this.price.position.set(this.price.width * 0.45, 0);
        this.locked.addChild(this.price);

        this.addChild(this.locked);
    }

    onGetSkin() {
        
    }

    onSetSkin() {
        
    }
}