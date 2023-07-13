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
    this._initPlayer();
    this._initSceneUI();
    this._initSceneOverUI();
  }

  _initPlayer(){
    this.flag = false;
    //player1
    this.player1 = new Player(this);
    this.player1.dualModeEnabled = true;
    this.player1.position.set(0, -50);
    this.addChild(this.player1);
    this.direction1 = this.player1.movement.direction.x;
    //player2
    this.player2 = new Player(this);
    this.player2.dualModeEnabled = true;
    this.player2.position.set(100, 100);
    this.player2.scale.set(-1);
    this.direction2 = this.player2.movement.direction.x;
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
  _initSceneOverUI() {
    this.sceneOverUI = new DualModeOverUI();
    this.addChild(this.sceneOverUI);
    this.sceneOverUI.onReset(this.sceneUI.stateStarTop, this.sceneUI.stateStarBottom)
    this.sceneOverUI.hideGameOverUI();
  }

  _onResetScene(){
    this.sceneUI.onReset();
    this.sceneOverUI.onReset();
  }

  _initSceneEvent() {
    this.on("nextLevel", this._onNextLevel.bind(this));
    this.sceneOverUI.on("replay", this._onResetScene.bind(this));
    this.on("lose", this._onLose.bind(this));
    this.sceneUI.on("toClassicModeScene", () => {
      this.parent.onStartScene("ClassicModeScene")
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
    if(this.player1.movement.direction.x == this.direction1 * -1) {
      this.player1.onNextLevel();
      this.direction1 *= -1;
      if(!this.flag) {
        console.log("spikes");
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
    if(this.player2.movement.direction.x == this.direction2 * -1) {
      this.player2.onNextLevel();
      this.direction2 *= -1;
      if(!this.flag) {
        console.log("spikes");
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }



  update(dt) {
    this.player1.update(dt);
    this.player2.update(dt);
    this.sceneUI.update(dt);
    this.sceneOverUI.update(dt);
  }
}