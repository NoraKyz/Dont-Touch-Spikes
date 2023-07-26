import { Sprite, Container, Assets } from "pixi.js";

export class BackgroundChallenges extends Container {
  constructor() {
    super();
    this._initComponent();
  }

  _initComponent() {
    this._initSprite();
    console.log("backgroundChallenges");
  }

  _initSprite() {
    this.bg = Sprite.from(Assets.get("challengeBackground"));
    this.bg.anchor.set(0.5);
    this.addChild(this.bg);
  }
}
