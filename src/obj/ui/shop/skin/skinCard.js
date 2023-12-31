import {
  Assets,
  Container,
  Graphics,
  Sprite,
  Text,
  AnimatedSprite,
  Texture,
} from "pixi.js";
import { SkinManager } from "../../../skin/skinManager";

export class SkinCard extends Container {
  constructor(skin, index) {
    super();
    this._initProperties(skin, index);
    this._initSprite();
    this._initEvents();
  }

  _initProperties(skin, index) {
    this.index = index
    this.data = skin;
    this.skinManager = SkinManager.instance;
  }

  _initEvents() {
    this.on("unlockSkin", () => this.onUnlocked());
  }

  _initSprite() {
    this._spriteLocked();
    this._spriteUnlocked();

    if (this.data.enabled) {
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
    this.unlocked.eventMode = "static";
    this.unlocked.on("pointertap", () => this.onSetSkin());

    this.bg1 = new Graphics();
    this.bg1.beginFill(0xffffff);
    this.bg1.drawRoundedRect(-160, -55, 320, 110, 18);
    this.bg1.endFill();
    this.unlocked.addChild(this.bg1);

    this.sprite = [];
    this.sprite.push(Assets.get(this.data.texture1));
    this.sprite.push(Assets.get(this.data.texture2));
    this.skin = new AnimatedSprite(this.sprite);
    this.skin.anchor.set(0.5);
    this.skin.scale.set(0.2);
    this.skin.animationSpeed = 0.02;
    this.skin.play();
    this.unlocked.addChild(this.skin);

    this.addChild(this.unlocked);
  }

  _spriteLocked() {
    this.locked = new Container();
    this.locked.cursor = "pointer";
    this.locked.eventMode = "static";
    this.locked.on("pointertap", () => this.onGetSkin());

    this.bg2 = new Graphics();
    this.bg2.beginFill(0xff8207);
    this.bg2.drawRoundedRect(-160, -55, 320, 110, 18);
    this.bg2.endFill();
    this.locked.addChild(this.bg2);

    this.icon = new Sprite(Assets.get("candy"));
    this.icon.anchor.set(0.5);
    this.icon.scale.set(1.5);
    this.icon.position.set(-80, 0);
    this.locked.addChild(this.icon);

    this.price = new Text(this.data.cost.value, {
      fill: "#FFFFFF",
      fontFamily: "Blissful Thinking",
      fontSize: 70,
      fontWeight: "lighter",
      letterSpacing: 1,
    });
    this.price.anchor.set(0.5);
    this.price.position.set(this.price.width * 0.45, 0);
    this.locked.addChild(this.price);

    this.addChild(this.locked);
  }


  onUnlocked() {
    this.unlocked.visible = true;
    this.locked.visible = false;
  }

  onGetSkin() {
    this.skinManager.onGetSkin(this);
  }

  onSetSkin() {
    this.skinManager.onSetSkin(this);
  }



  onUnlocked() {
    //console.log('log');
    this.unlocked.visible = true;
    this.locked.visible = false;
  }

  onGetSkin() {
    this.skinManager.onGetSkin(this);
  }

  onSetSkin() {
    this.skinManager.onSetSkin(this);
  }
}
