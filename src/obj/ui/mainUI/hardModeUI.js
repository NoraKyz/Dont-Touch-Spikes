import { Graphics } from "pixi.js";
import { Game } from "../../../game";
import { MainUI } from "./mainUI";

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
    this.backButton = new Graphics();
    this.backButton.circleRadius = 40 / Game.ratio;
    this.backButton.beginFill(0x888888);
    this.backButton.drawCircle(-300 / Game.ratio, -230 / Game.ratio, this.backButton.circleRadius);
    this.backButton.endFill();
    
    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointerdown", () => this._backToClassicUI());

    this.addChild(this.backButton);
  }

  _backToClassicUI() {

  }
}