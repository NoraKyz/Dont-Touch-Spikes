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
import {DualModeUI} from "../obj/ui/main/DualModeUI";
import {Game} from "../game";
import {BackgroundDual} from "../obj/background/backgroundDual";

export class DualModeScene extends GameScene {
  constructor() {
    super();
  }

  _initProperties(){
    super._initProperties();
    this.id = 'dualModeScene';
  }

  _initGameplay() {
    this._initBackground();
    this._initPlayer();
    this._initSceneUI();
  }

  _initPlayer(){

    this.player1 = new Player(this);
    this.player1.dualModeEnabled = true;
    this.addChild(this.player1);

    this.player2 = new Player(this);
    this.player2.dualModeEnabled = true;
    this.player2.position.set(100, 100);
    this.player2.scale.set(-1);
    this.player2.movement.jumpForce *= -1;
    this.player2.movement.gravity *= -1;
    this.player2.movement.direction2 *= -1;
    this.addChild(this.player2);
  }
  _initBackground() {
    this._initBackgroundFull();
    this._initBackgroundTop();
  }

  _initBackgroundFull() {
    this.background1 = new BackgroundDual();
    this.background1.fullPlayGround.visible =  true;
    this.background1.scoreBgFull.visible = true;
    this.addChild(this.background1);
  }

  _initBackgroundTop() {
    this.background2 = new BackgroundDual();
    this.addChild(this.background2);
  }


  _initSceneUI() {
    this.sceneUI = new DualModeUI();
    this.addChild(this.sceneUI);
  }

  _initSceneEvent() {
    this.on("nextLevel", this._onNextLevel.bind(this));
    this.on("lose", this._onLose.bind(this));
    this.sceneUI.on("toClassicModeScene", () => {
      this.parent.onStartScene("classicModeScene")
    });
    this.background1.on("pointerdown", () => {
      this._onPointerDownBackground1();
    });
    this.background2.on("pointerdown", () => {
      this._onPointerDownBackground2();
    });
  }

  _onPointerDownBackground1() {
    if(this.gameState != GameState.End) {
      if(this.gameState == GameState.Ready) {
        this.sceneUI.hideMainUI();
        this.player2.onPointerDown();
      }
      this.player1.onPointerDown();
      this.gameState = GameState.Playing;
      //hiện Bg
      this.background1.fullPlayGround.visible = false;
      this.background1.playGroundBottom.visible = true;
      this.background2.playGroundTop.visible = true;
      //hiện ScoreBg
      this.background1.scoreBgFull.visible = false;
      this.background1.scoreBgBottom.visible = true;
      this.background2.scoreBgTop.visible = true;
      Assets.get("flyingSound").play();
    }
  }

  _onPointerDownBackground2() {
    if(this.gameState != GameState.End) {
      this.player2.onPointerDown();
      this.gameState = GameState.Playing;
      Assets.get("flyingSound").play();
    }
  }

  _onLose() {

  }

  _onNextLevel() {
    if(this.gameState == GameState.End) {
      return;
    }
    //this.player1.onNextLevel();
    this.player2.onNextLevel();
  }



  update(dt) {
    this.player1.update(dt);
    this.player2.update(dt);
  }
}