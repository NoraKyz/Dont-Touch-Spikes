import { Assets, Sprite } from "pixi.js";
import { MainUI } from "./mainUI";

export class ClassicUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    super._initComponent();
    this._initHardModeSwitch();
    this._initShopSkinButton();
  }

  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "DON\'T TOUCH\n   THE SPIKES";
    this.gameName.style = this.titleStyle;
  }

  _initHardModeSwitch() {
    this.hardModeSwitch = Sprite.from(Assets.get("hardModeButton"));
    this.hardModeSwitch.anchor.set(0.5);
    this.hardModeSwitch.scale.set(0.15);
    this.hardModeSwitch.position.set(-290, -230);

    this.hardModeSwitch.cursor = "pointer";
    this.hardModeSwitch.eventMode = 'static';
    this.hardModeSwitch.on("pointerdown", () => this._toHardModeScene());

    this.addChild(this.hardModeSwitch);
  }

  _initShopSkinButton(){
    this.skinShopButton = Sprite.from(Assets.get("skinShopButton"));
    this.skinShopButton.anchor.set(0.5);
    this.skinShopButton.scale.set(0.15);
    this.skinShopButton.position.set(290, -230);

    this.skinShopButton.cursor = "pointer";
    this.skinShopButton.eventMode = 'static';
    this.skinShopButton.on("pointerdown", () => this._startSkinsShopUI());
    this.addChild(this.skinShopButton);
  }

  _toHardModeScene() {
    this.emit("toHardModeScene");
  }

  _startSkinsShopUI() {
    this.emit("startSkinsShopUI");
  }
}