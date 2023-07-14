import {Assets, Container, Graphics, Sprite, Text, TextStyle} from "pixi.js";
import {MainUI} from "./mainUI.js";
import * as TWEEN from '@tweenjs/tween.js'

export class DualModeUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    this._initProperties();
    this._initBackButton();
    this._initGameTutol();
    this._initResult();
    this._initStarTop();
    this._initStarBottom();
    this._initLine();
    this._initEffect();
    this._UIEffect();
  }
  
  _initProperties() {
    this.readyUI = new Container();
    this.resultUI = new Container();
    this.addChild(this.readyUI);
    this.addChild(this.resultUI);
    this.styleBig = new TextStyle({
        fill: "#FF3464",
        fontFamily: "Blissful Thinking",
        fontSize: 52,
        fontWeight: "lighter",
        letterSpacing: 1,
    });
    this.styleSmall = new TextStyle({
        fill: "#FF3464",
        fontFamily: "Blissful Thinking",
        fontSize: 44,
        fontWeight: 550,
        letterSpacing: 1,
    });
    this.gameState = {
      player1: [false, false, false],
      player2: [false, false, false],
    }
  } 

  _initResult(){
    this.resultTop = new Text("PLAYER1 WIN!", {...this.styleBig, fill: "#666666", fontSize: 70});
    this.resultTop.anchor.set(0.5);
    this.resultTop.position.set(0, - 300);
    this.resultTop.scale.set(-1);

    this.resultBottom = new Text("PLAYER1 WIN!", {...this.styleBig, fill: "#666666", fontSize: 70});
    this.resultBottom.anchor.set(0.5);
    this.resultBottom.position.set(0, 300);

    this.resultUI.addChild(this.resultTop);
    this.resultUI.addChild(this.resultBottom);
    this.resultUI.visible = false;
    this.resultUI.alpha = 0;
  }

  _initGameTutol() {
    this.playerTop = new Text("PLAYER 2", {...this.styleBig, fill: "#309cfe"});
    this.playerTop.anchor.set(0.5);
    this.playerTop.position.set(0, - 280);
    this.playerTop.scale.set(-1);
    this.tutorTop = new Text("touch here to jump", {...this.styleSmall, fill: "#309cfe"});
    this.tutorTop.anchor.set(0.5);
    this.tutorTop.position.set(0, - 330);
    this.tutorTop.scale.set(-1);

    this.playerBottom = new Text("PLAYER 1", this.styleBig);
    this.playerBottom.anchor.set(0.5);
    this.playerBottom.position.set(0, 280);
    this.tutorBottom = new Text("touch here to jump", this.styleSmall);
    this.tutorBottom.anchor.set(0.5);
    this.tutorBottom.position.set(0, 330);

    this.gameTutorial = new Container();
    this.gameTutorial.addChild(this.playerTop);
    this.gameTutorial.addChild(this.playerBottom);
    this.gameTutorial.addChild(this.tutorTop);
    this.gameTutorial.addChild(this.tutorBottom);
    this.readyUI.addChild(this.gameTutorial);
  }

  _initLine(){
    // Làm cái line chuẩn tí nữa là được
    this.line = Sprite.from(Assets.get("line"));
    this.line.anchor.set(0.5);
    this.line.scale.set(0.3);
    this.line.position.set(0, 0);
    this.readyUI.addChild(this.line);
  }
  _initBackButton() {
    this.backButton = Sprite.from(Assets.get("undoButton"));
    this.backButton.anchor.set(0.5);
    this.backButton.scale.set(0.15);
    this.backButton.position.set(-290, -420);

    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointerdown", () => this._toClassicModeScene());

    this.readyUI.addChild(this.backButton);
  }

  _initStar(position){
    const star = new Container();
    star.loseStar = Sprite.from(Assets.get("star1"));
    star.loseStar.position.set(position.x, position.y);
    star.loseStar.anchor.set(0.5);
    star.loseStar.scale.set(1.2);
    star.winStar = Sprite.from(Assets.get("star2"));
    star.winStar.position.set(position.x, position.y);
    star.winStar.anchor.set(0.5);
    star.winStar.scale.set(1.2);
    star.addChild(star.loseStar);
    star.addChild(star.winStar);
    star.winStar.visible = false;
    return star;
  }

  _initStarTop(){
    this.topStar1 = this._initStar({x: -60, y: 140});
    this.topStar2 = this._initStar({x: 0, y: 138});
    this.topStar3 = this._initStar({x: 60, y: 140});
    this.topStar1.scale.set(-1); 
    this.topStar2.scale.set(-1);
    this.topStar3.scale.set(-1);
    this.readyUI.addChild(this.topStar1);
    this.readyUI.addChild(this.topStar2);
    this.readyUI.addChild(this.topStar3);
  }
  _initStarBottom(){
    this.bottomStar1 = this._initStar({x: -60, y: 140});
    this.bottomStar2 = this._initStar({x: 0, y: 138});
    this.bottomStar3 = this._initStar({x: 60, y: 140});
    this.readyUI.addChild(this.bottomStar1);
    this.readyUI.addChild(this.bottomStar2);
    this.readyUI.addChild(this.bottomStar3);
  }

  _onPlayer1Win(){
    if(this.bottomStar1.winStar.visible === false) this.bottomStar1.winStar.visible = true;
    else if (this.bottomStar2.winStar.visible === false) this.bottomStar2.winStar.visible = true;
    else if (this.bottomStar3.winStar.visible === false) this.bottomStar3.winStar.visible = true;
    this.gameState.player1 = [this.bottomStar1.winStar.visible, this.bottomStar2.winStar.visible, this.bottomStar3.winStar.visible];
  }
  _onPlayer2Win(){
    if(this.topStar1.winStar.visible === false) this.topStar1.winStar.visible = true;
    else if (this.topStar2.winStar.visible === false) this.topStar2.winStar.visible = true;
    else if (this.topStar3.winStar.visible === false) this.topStar3.winStar.visible = true;
    this.gameState.player2 = [this.topStar1.winStar.visible, this.topStar2.winStar.visible, this.topStar3.winStar.visible];
  }

  _toClassicModeScene() {
    this.emit("toClassicModeScene")
  }

  _initEffect(){
    this.elapsed = 0;
    this.tween1 = new TWEEN.Tween(this.gameTutorial)
      .to({alpha: 0}, 1000);
    this.tween2 = new TWEEN.Tween(this.gameTutorial)
      .to({alpha: 1}, 1000);
    this.tweenResult = new TWEEN.Tween(this.resultUI)
      .to({alpha: 1}, 1000);
  }

  onAllReSet(){
    this.gameState.player1 = [false, false, false];
    this.gameState.player2 = [false, false, false];
    this.topStar1.winStar.visible = false;
    this.topStar2.winStar.visible = false;
    this.topStar3.winStar.visible = false;
    this.bottomStar1.winStar.visible = false;
    this.bottomStar2.winStar.visible = false;
    this.bottomStar3.winStar.visible = false;
  }

  _UIEffect(){ 
    this.tween1.start().onComplete(() => {
      this.tween2.start();
    });
  }
  _resetResultUI(winPlayer){
    if(winPlayer == "player1") {
      this.resultTop.text = "PLAYER1 WIN!";
      this.resultBottom.text = "PLAYER1 WIN!";
    }
    else {
      this.resultTop.text = "PLAYER2 WIN!";
      this.resultBottom.text = "PLAYER2 WIN!";
    }
  }

  _showResultUI(winPlayer){
    this._resetResultUI(winPlayer);
    this.resultUI.visible = true;
    this.tweenResult.start();
    this.readyUI.visible = false;
  }
  _showReadyUI(){
    this.resultUI.visible = false;
    this.readyUI.visible = true;
    this.resultUI.alpha = 0;
  }
  
  update(dt){
    this.elapsed += dt;
    if(this.elapsed >= 150){
      this._UIEffect();
      this.elapsed = 0;
    }
  }
}