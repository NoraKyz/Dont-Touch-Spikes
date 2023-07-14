import {Assets, Container, Graphics} from "pixi.js";
import { GameScene, GameState } from "./gameScene.js";
import { Data } from "../data.js";
import { Player } from "../obj/player/player.js";
import { SpikesManager } from "../obj/trap/spikesManager.js";
import { Spike } from "../obj/trap/spike.js";
import { LevelController } from "../levelController.js";
import {BackgroundDual} from "../obj/background/backgroundDual";
import { DualModeOverUI } from "../obj/ui/over/dualModeOverUI.js";
import { DualModeUI } from "../obj/ui/main/dualModeUI.js";

export class DualModeScene extends GameScene {
  constructor() {
    super();
  }

  _initProperties(){
    super._initProperties();
    this.id = "dualModeScene";
  }

  _initGameplay() {
    this.flag = false;
    this._initBackground();
    this._initPlayer();
    this._initSceneUI();
    this._initSceneOverUI();
    this._initSpikes(); 
  }

  _initPlayer(){
    //player1
    this.player1 = new Player(this);
    this.player1.dualModeEnabled = true;
    this.player1.rootPos = {x: 0, y: 50};
    this.player1.position = this.player1.rootPos;
    this.player1.victory = false;
    this.direction1 = 1;
    this.addChild(this.player1);
    //player2
    this.player2 = new Player(this);
    this.player2.dualModeEnabled = true;
    this.player2.rootPos = {x: 0, y: -50};
    this.player2.position = this.player2.rootPos;
    this.player2.victory = false;
    this.player2.scale.set(-1);
    this.player2.movement.direction = {x: -1,y: -1};
    this.direction2 = -1;
    this.addChild(this.player2);

    this.player1Point = 0;
    this.player2Point = 0;
    this.winPlayer = "";
  }

  _initSpikes() {
    this.movedSpikes = false;
    this.spikes = new SpikesManager(this.id);
    this.spikes.spikesBottom.forEach(spike => spike.y = 91);
    this.spikes.changeColor(this.background1.originColor.colorDarker);  
    this.addChild(this.spikes);
  }
  
  _initBackground() {
    this._initBackgroundFull();
    this._initBackgroundTop();
  }

  _initBackgroundFull() {
    this.background1 = new BackgroundDual();
    this.background1.fullPlayGround.visible = true;
    this.background1.scoreBgFull.visible = true;
    this.addChild(this.background1);
  }

  _initBackgroundTop() {
    this.background2 = new BackgroundDual();
    this.background2.alpha = 0;
    this.addChild(this.background2);
  }

  _initSceneUI() {
    this.sceneUI = new DualModeUI();
    this.addChild(this.sceneUI);
  }
  _initSceneOverUI() {
    this.sceneOverUI = new DualModeOverUI();
    this.addChild(this.sceneOverUI);
    this.sceneOverUI.hideGameOverUI();
  }

  _onResetScene(){
    this.sceneUI.backButton.visible = false;
    if(this.player1Point === 3 || this.player2Point === 3){
      this.player1Point = 0;
      this.player2Point = 0;
      this.sceneUI.onAllReSet();
      this.sceneOverUI.onAllReset();
      this.sceneUI.backButton.visible = true;
    }
    this.gameState = GameState.Ready;
    Data.resetScore();
    this.background1.onReset();
    this.background2.onReset();
    this.background2.playGroundTop.visible = false;
    this.background2.scoreBgTop.visible = false;
    this.spikes.onReset(); // màu
    this.spikes.changeColor(this.background1.originColor.colorDarker);  

    this.sceneOverUI.onReset();
    this.sceneUI.onReset();

    this.player1.onReset();
    this.player2.onReset(); // vị trí

    this.player1.dualModeEnabled = true;
    this.player1.rootPos = {x: 0, y: 50};
    this.player1.position = this.player1.rootPos;
    this.player1.victory = false;
    this.direction1 = this.player1.movement.direction.x;
    //player2
    this.player2.dualModeEnabled = true;
    this.player2.rootPos = {x: 0, y: -50};
    this.player2.position = this.player2.rootPos;
    this.player2.victory = false;
    this.direction2 = this.player2.movement.direction.x;
    this.player2.scale.set(-1);

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
      if(this.gameState === GameState.Ready) {
        this.sceneUI.hideMainUI();
        this.player2.onPointerDown();
        this.background1.displayScore();
      }
      this.player1.onPointerDown();
      this.gameState = GameState.Playing;
      this.background2.playGroundTop.visible = true;
      this.background2.scoreBgTop.visible = true;
      Assets.get("flyingSound").play();
    }
  }

  _onPointerDownBackground2() {
    if(this.gameState != GameState.End) {
      if(this.gameState === GameState.Ready) {
        this.sceneUI.hideMainUI();
        this.player2.onPointerDown();
        this.background1.displayScore();
      }
      this.player2.onPointerDown();
      this.gameState = GameState.Playing;
      Assets.get("flyingSound").play();
    }
  }

  _onLose() {
    if (this.gameState == GameState.End) {
        return;
    }
    this.gameState = GameState.End;
    Assets.get("loseSound").play();
    setTimeout(() => {
        this.sceneOverUI.onResetStar(this.sceneUI.gameState);
        this.sceneOverUI.winTitle(this.winPlayer);
        this.sceneOverUI.showGameOverUI();
        this.background2.hideScore();
    }, 1000);
  }
  _onEndRound(){
    if (this.gameState == GameState.End) {
      return;
    }
    this.gameState = GameState.End;
    Assets.get("loseSound").play();
    setTimeout(() => {
        this._onResetScene(); 
        this.sceneUI._showResultUI(this.winPlayer);
        setTimeout(() => {
          this.sceneUI._showReadyUI();
        }, 2000);
    }, 1000);
  }

  _onNextLevel(direction) {
    if(this.gameState == GameState.End) {
      return;
    }
    if(this.player1.movement.direction.x == this.direction1 * -1) {
      this.player1.onNextLevel();
      this.direction1 *= -1;
      if(!this.movedSpikes) {
        this.background1.updateBackground(++Data.currentScore);
        let limitSpike = LevelController.updateLevel();
        this.spikes.moveSpikes(direction, limitSpike);
        this.movedSpikes = true;
      } else {
        this.movedSpikes = false;
      }
    }
    if(this.player2.movement.direction.x == this.direction2 * (-1)) {
      this.player2.onNextLevel();
      this.direction2 *= -1;
      if(!this.movedSpikes) {
         this.background1.updateBackground(++Data.currentScore);
        let limitSpike = LevelController.updateLevel();
        this.spikes.moveSpikes(direction, limitSpike);
        this.movedSpikes = true;
      } else {
        this.movedSpikes = false;
      }
    }
  }

  _onCollision(obj1, obj2) {
    if (obj1 === this.player1 && obj2 instanceof Spike) {
      this.sceneUI._onPlayer2Win();
      this.player1.onCollision(obj2);
      this.player2.victory = true;
      this.player2Point++;
      this.winPlayer = "player2";
      if(this.player2Point === 3){
        this._onLose();
      } else this._onEndRound();
    }
    if (obj1 === this.player2 && obj2 instanceof Spike) {
      this.player2.onCollision(obj2);
      this.player1.victory = true;
        this.sceneUI._onPlayer1Win();
        this.player1Point++;
        this.winPlayer = "player1";
        if(this.player1Point === 3){
          this._onLose();
        } else this._onEndRound();
    }
    if (obj1 === this.player1 && obj2 === this.player2) {
      //lực player1 > player2
      if(this.player1.movement.velocity.y < this.player2.movement.velocity.y) {
        this.player1.onCollision(this.player2);
        //console.log("player2 " + this.player2.movement.velocity.x);

      } else if(-obj1.movement.velocity.y < obj2.movement.velocity.y) {
        //this.player1.onCollision(obj1);
      } else {
       // console.log("draw");
      }
    }
  }

  update(dt) {
    this.player1.update(dt);
    this.player2.update(dt);
    this.sceneUI.update(dt);
    this.sceneOverUI.update(dt);
    if (this.gameState == GameState.Playing) {
      this.colliderDetector.checkCollider(this.player1, this.spikes.poolSpikes);
      this.colliderDetector.checkCollider(this.player2, this.spikes.poolSpikes);
      //this.colliderDetector.checkCollider(this.player1, this.player2);
    }
  }
}