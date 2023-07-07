import { Assets, Graphics, Sprite } from "pixi.js";
import { Game } from "../../../game";
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
    this.backButton = Sprite.from(Assets.get("undoButton"));
    this.backButton.anchor.set(0.5);
    this.backButton.scale.set(0.15 / Game.ratio);
    this.backButton.position.set(-290 / Game.ratio, -420 / Game.ratio);

    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointerdown", () => this._toClassicModeScene());

    this.addChild(this.backButton);
  }

  _toClassicModeScene() {
    this.emit("toClassicModeScene")
  }
}