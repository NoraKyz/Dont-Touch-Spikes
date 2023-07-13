import {Assets, Container, Graphics} from "pixi.js";
import { GameScene, GameState } from "./gameScene.js";
import { Data } from "../data.js";
import { Background } from "../obj/background/background.js";
import { GameInfor } from "../obj/ui/gameInfor.js";
import { CandyManager } from "../obj/items/candyManager.js";
import { Candy } from "../obj/items/candy.js";
import { Player } from "../obj/player/player.js";
import { SpikesManager } from "../obj/trap/spikesManager.js";
import { Spike } from "../obj/trap/spike.js";
import { LevelController } from "../levelController.js";
import {DualModeUI} from "../obj/ui/main/dualModeUI.js";
import {Game} from "../game";
import {BackgroundDual} from "../obj/background/backgroundDual";
import { DualModeOverUI } from "../obj/ui/over/dualModeOverUI.js";

export class DualModeScene extends GameScene {
  constructor() {
    super();
  }

  _initProperties(){
    super._initProperties();
    this.id = "dualModeScene";
  }

  _initGameplay() {
    this._initBackground();
    //this._initPlayer();
    this._initSceneUI();
    this._initSceneOverUI();
  }

  _initPlayer(){
    this.player1 = new Player(this);
    this.player1.dualModeEnabled = true;
    this.player1.position.set(0, -50);
    this.player1.scale.set(-1);
    this.addChild(this.player1);

    this.player2 = new Player(this);
    this.player2.dualModeEnabled = true;
    this.player2.position.set(0, 50);
    this.addChild(this.player2);
  }
  _initBackground() {
    this.background = new BackgroundDual();
    this.addChild(this.background);
  }

  _initSceneUI() {
    this.sceneUI = new DualModeUI();
    //this.addChild(this.sceneUI);
  }
  _initSceneOverUI() {
    console.log(this.sceneUI.stateStarTop, this.sceneUI.stateStarBottom);
    this.sceneOverUI = new DualModeOverUI();
    this.addChild(this.sceneOverUI);
    this.sceneOverUI.onReset(this.sceneUI.stateStarTop, this.sceneUI.stateStarBottom)
    //this.sceneOverUI.hideGameOverUI();
  }

  _onResetScene(){
    // this.sceneUI.onReset();
    // this.sceneOverUI.onReset();
  }

  _initSceneEvent() {
    this.sceneOverUI.on("replay", this._onResetScene.bind(this));
    this.on("lose", this._onLose.bind(this));
    this.sceneUI.on("toClassicModeScene", () => {
      this.parent.onStartScene("classicModeScene")
    });
  }

  _onLose() {

  }

  update(dt) {
    // this.player1.update(dt);
    // this.player2.update(dt);
    // this.sceneUI.update(dt);
    this.sceneOverUI.update(dt);
  }
}