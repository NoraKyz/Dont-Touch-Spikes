import {Assets, Graphics, Sprite} from "pixi.js";
import {MainUI} from "./mainUI.js";

export class DualModeUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    this._initBackButton();
    this._initGameTutol();
    super._initComponent();
  }

  _initGameTutol() {

  }

  _initTitleUI() {
    super._initTitleUI();

  }

  _initBackButton() {
    this.backButton = Sprite.from(Assets.get("undoButton"));
    this.backButton.anchor.set(0.5);
    this.backButton.scale.set(0.15);
    this.backButton.position.set(-290, -420);

    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointerdown", () => this._toClassicModeScene());

    this.addChild(this.backButton);
  }

  _toClassicModeScene() {
    this.emit("toClassicModeScene")
  }



}