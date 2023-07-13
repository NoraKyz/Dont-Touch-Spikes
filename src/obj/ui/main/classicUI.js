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
    this._initDualModeSwitch();
  }

  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "DON\'T TOUCH\n   THE SPIKES";
    this.gameName.style = this.titleStyle;
  }

  _initHardModeSwitch() {
    console.log("init hard mode switch");
    this.hardModeSwitch = Sprite.from(Assets.get("hardModeButton"));
    this.hardModeSwitch.anchor.set(0.5);
    this.hardModeSwitch.scale.set(0.18);
    this.hardModeSwitch.position.set(-290, -230);

    this.hardModeSwitch.cursor = "pointer";
    this.hardModeSwitch.eventMode = 'static';
    this.hardModeSwitch.on("pointerdown", () => this._toHardModeScene());
    this.addChild(this.hardModeSwitch);
  }

  _initDualModeSwitch() {
    this.dualModeSwitch = Sprite.from(Assets.get("dualModeButton"));
    this.dualModeSwitch.anchor.set(0.5);
    this.dualModeSwitch.scale.set(0.18);
    this.dualModeSwitch.position.set(-290, -120);

    this.dualModeSwitch.cursor = "pointer";
    this.dualModeSwitch.eventMode = 'static';
    this.dualModeSwitch.on("pointerdown", () => this._toDualModeScene());
    this.addChild(this.dualModeSwitch);
  }

  _toHardModeScene() {
    this.emit("toHardModeScene");
  }

  _toDualModeScene() {
    this.emit("toDualModeScene");
  }
}