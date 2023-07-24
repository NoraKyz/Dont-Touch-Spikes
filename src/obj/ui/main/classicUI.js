import { Assets, Sprite } from "pixi.js";
import { MainUI } from "./mainUI";

export class ClassicUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    super._initComponent();
    this._initHardModeSwitch();
    this._initDualModeSwitch();
    this._initShopSkinButton();
    this._initChallengesButton();
  }

  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "DON'T TOUCH\n   THE SPIKES";
    this.gameName.style = this.titleStyle;
  }

  _initHardModeSwitch() {
    this.hardModeSwitch = Sprite.from(Assets.get("hardMode"));
    this.hardModeSwitch.anchor.set(0.5);
    this.hardModeSwitch.scale.set(0.18);
    this.hardModeSwitch.position.set(-290, -230);

    this.hardModeSwitch.cursor = "pointer";
    this.hardModeSwitch.eventMode = "static";
    this.hardModeSwitch.on("pointertap", () => this._toHardModeScene());

    this.addChild(this.hardModeSwitch);
  }

  _initDualModeSwitch() {
    this.dualModeSwitch = Sprite.from(Assets.get("dualMode"));
    this.dualModeSwitch.anchor.set(0.5);
    this.dualModeSwitch.scale.set(0.18);
    this.dualModeSwitch.position.set(-290, -120);

    this.dualModeSwitch.cursor = "pointer";
    this.dualModeSwitch.eventMode = "static";
    this.dualModeSwitch.on("pointerdown", () => this._toDualModeScene());
    this.addChild(this.dualModeSwitch);
  }

  _initShopSkinButton() {
    this.skinShopButton = Sprite.from(Assets.get("skinShop"));
    this.skinShopButton.anchor.set(0.5);
    this.skinShopButton.scale.set(0.18);
    this.skinShopButton.position.set(290, -230);

    this.skinShopButton.cursor = "pointer";
    this.skinShopButton.eventMode = "static";
    this.skinShopButton.on("pointertap", () => this._startSkinsShopUI());
    this.addChild(this.skinShopButton);
  }

  _initChallengesButton() {
    this.challengesButton = Sprite.from(Assets.get("tick"));
    this.challengesButton.anchor.set(0.5);
    this.challengesButton.scale.set(0.18);
    this.challengesButton.position.set(290, -120);

    this.challengesButton.cursor = "pointer";
    this.challengesButton.eventMode = 'static';
    this.challengesButton.on("pointertap", () => this._toChallengesScene());
    this.addChild(this.challengesButton);
  }

  _toHardModeScene() {
    this.emit("toHardModeScene");
  }

  _toDualModeScene() {
    this.emit("toDualModeScene");
  }

  _toDailyChallengeScene() {}

  _startSkinsShopUI() {
    this.emit("startSkinsShopUI");
  }
  
  _toChallengesScene() {
    this.emit("toChallengesScene");
  }

}