import { Assets, Container, Sprite } from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import { CommonUtils } from "../../commonUtils";

export class SpikeSprite extends Container {
  constructor() {
    super();
    this._initSprite();
  }

  _initSprite() {
    this.size = 70; // Kích thước cạnh tam giác
    this.sprite = Sprite.from(Assets.get("spike"));
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(1.15);
    this.addChild(this.sprite);
  }

  changeColorEffect(targetColor) {
    let startColor = this.sprite.tint;
    this.effect = new TWEEN.Tween({ ratio: 0 })
      .to({ ratio: 1 }, 800)
      .onUpdate((val) => {
        let nextColor = CommonUtils.lerpColor(startColor, targetColor, val.ratio);
        this.sprite.tint = nextColor;
      })
      .start();
  }

  changeColor(color) {
    this.sprite.tint = color;
  }
}