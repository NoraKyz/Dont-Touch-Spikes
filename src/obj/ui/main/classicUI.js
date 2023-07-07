import { Assets, Graphics, Sprite } from "pixi.js";
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
    this.hardModeSwitch = Sprite.from(Assets.get("hardModeButton"));
    this.hardModeSwitch.anchor.set(0.5);
    this.hardModeSwitch.scale.set(0.15 / Game.ratio);
    this.hardModeSwitch.position.set(-290 / Game.ratio, -230 / Game.ratio);

    this.hardModeSwitch.cursor = "pointer";
    this.hardModeSwitch.eventMode = 'static';
    this.hardModeSwitch.on("pointerdown", () => this._toHardModeScene());

    this.addChild(this.hardModeSwitch);
  }

  _toHardModeScene() {
    this.emit("toHardModeScene")
  }
}