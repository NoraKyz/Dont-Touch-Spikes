import { Assets, Graphics, Sprite } from "pixi.js";
import { MainUI } from "./mainUI.js";

export class HardModeUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    super._initComponent();
    this._initBackButton();
  }

  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "  HARD\n MODE";
    this.gameName.style = this.titleStyle;
  }

  _initBackButton() {
    this.backButton = Sprite.from(Assets.get("undo"));
    this.backButton.anchor.set(0.5);
    this.backButton.scale.set(0.15 );
    this.backButton.position.set(-290 , -420 );

    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointertap", () => this._toClassicModeScene());

    this.addChild(this.backButton);
  }

  _toClassicModeScene() {
    this.emit("toClassicModeScene")
  }
}