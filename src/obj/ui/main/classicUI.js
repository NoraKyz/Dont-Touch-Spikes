import { Graphics } from "pixi.js";
import { MainUI } from "./mainUI";
import { Game } from "../../../game";

export class ClassicUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    super._initComponent();
    this._initHardModeSwitch();
  }

  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "DON\'T TOUCH\n   THE SPIKES";
    this.gameName.style = this.titleStyle;
  }

  _initHardModeSwitch() {
    this.hardModeSwitch = new Graphics();
    this.hardModeSwitch.circleRadius = 40 / Game.ratio;
    this.hardModeSwitch.beginFill(0x888888);
    this.hardModeSwitch.drawCircle(-300 / Game.ratio, -230 / Game.ratio, this.hardModeSwitch.circleRadius);
    this.hardModeSwitch.endFill();

    this.hardModeSwitch.cursor = "pointer";
    this.hardModeSwitch.eventMode = 'static';
    this.hardModeSwitch.on("pointerdown", () => this._toHardModeScene());

    this.addChild(this.hardModeSwitch);
  }

  _toHardModeScene() {
    this.emit("toHardModeScene")
  }
}