import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";
import { MainUI } from "./mainUI.js";
import * as TWEEN from '@tweenjs/tween.js'

export class DualModeUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    this._initUI();
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

  _initUI(){
    this.readyUI = new Container();
    this.resultUI = new Container();
    this.addChild(this.readyUI);
    this.addChild(this.resultUI);
  }

  _initProperties() {
    this.styleBig = new TextStyle({
        fill: "#FF3464",
        fontFamily: "Blissful Thinking",
        letterSpacing: 1,
        fontSize: 52,
        fontWeight: "lighter",
    });
    this.styleSmall = new TextStyle({
        ...this.styleBig,
        fontSize: 44,
        fontWeight: 550,
    });
    this.gameState = {
      player1: [false, false, false],
      player2: [false, false, false],
    }
  }

  _initResult(){
    this.resultTop = new Text("PLAYER 1 WIN!", {...this.styleBig, fill: "#666666", fontSize: 70});
    this.resultTop.anchor.set(0.5);
    this.resultTop.position.set(0, - 300);
    this.resultTop.scale.set(-1);

    this.resultBottom = new Text("PLAYER 1 WIN!", {...this.styleBig, fill: "#666666", fontSize: 70});
    this.resultBottom.anchor.set(0.5);
    this.resultBottom.position.set(0, 300);

    this.resultUI.addChild(this.resultTop);
    this.resultUI.addChild(this.resultBottom);
    this.resultUI.visible = false;
    this.resultUI.alpha = 0;
  }

  _createGameTutoriral(id, positionPlayer, positionTutorial, direction, color){
    if(typeof color === 'undefined') color = "#FF3464";
    const gameTutorial = new Container();
    gameTutorial.player = new Text(`PLAYER ${id}`, {...this.styleBig, fill: color});
    gameTutorial.player.anchor.set(0.5);
    gameTutorial.player.position.set(positionPlayer.x, positionPlayer.y);
    gameTutorial.player.scale.set(direction);
    gameTutorial.tutor = new Text("touch here to jump", {...this.styleSmall, fill: color});
    gameTutorial.tutor.anchor.set(0.5);
    gameTutorial.tutor.position.set(positionTutorial.x, positionTutorial.y);
    gameTutorial.tutor.scale.set(direction);
    gameTutorial.addChild(gameTutorial.player, gameTutorial.tutor);
    return gameTutorial;
  }

  _initGameTutol() {
    this.gameTutorial = new Container();
    this.gameTutorialTop = this._createGameTutoriral(2, {x: 0, y: -280}, {x: 0, y: -330}, -1, "#309cfe");
    this.gameTutorialBottom = this._createGameTutoriral(1, {x: 0, y: 280}, {x: 0, y: 330}, 1);
    this.gameTutorial.addChild(this.gameTutorialTop);
    this.gameTutorial.addChild(this.gameTutorialBottom);
    this.readyUI.addChild(this.gameTutorial);
  }

  _initLine(){
    const spacing = 76;
    const number = 4;
    for(let i = -number; i <= number; i++){
      this.line = Sprite.from(Assets.get("line"));
      this.line.anchor.set(0.5);
      this.line.scale.set(2.3);
      this.line.position.set(i * spacing, 0);
      this.readyUI.addChild(this.line);
    }
  }

  _initBackButton() {
    this.backButton = Sprite.from(Assets.get("undo"));
    this.backButton.anchor.set(0.5);
    this.backButton.scale.set(0.15);
    this.backButton.position.set(-290, -420);

    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointerdown", () => this._toClassicModeScene());

    this.readyUI.addChild(this.backButton);
  }

  _createStar(type, position){
    const star = Sprite.from(Assets.get(type));
    star.position.set(position.x, position.y);
    star.anchor.set(0.5);
    star.scale.set(1.2);
    return star;
  }
 
  _generateStars(position, direction){
    const stars = new Container();
    stars.loseStar = this._createStar("star1", position);
    stars.winStar = this._createStar("star2", position);
    stars.addChild(stars.loseStar);
    stars.addChild(stars.winStar);
    stars.winStar.visible = false;
    stars.scale.set(direction);
    this.readyUI.addChild(stars);
    return stars;
  }
 
  _initStarTop(){
    this.topStar1 = this._generateStars({x: -60, y: 140}, -1);
    this.topStar2 = this._generateStars({x: 0, y: 138}, -1);
    this.topStar3 = this._generateStars({x: 60, y: 140}, -1);
  }
  _initStarBottom(){
    this.bottomStar1 = this._generateStars({x: -60, y: 140}, 1);
    this.bottomStar2 = this._generateStars({x: 0, y: 138}, 1);
    this.bottomStar3 = this._generateStars({x: 60, y: 140}, 1);
  }

  _onPlayer1Win() {
    if (this.bottomStar1.winStar.visible === false) this.bottomStar1.winStar.visible = true;
    else if (this.bottomStar2.winStar.visible === false) this.bottomStar2.winStar.visible = true;
    else if (this.bottomStar3.winStar.visible === false) this.bottomStar3.winStar.visible = true;
    this.gameState.player1 = [this.bottomStar1.winStar.visible, this.bottomStar2.winStar.visible, this.bottomStar3.winStar.visible];
  }
  _onPlayer2Win() {
    if (this.topStar1.winStar.visible === false) this.topStar1.winStar.visible = true;
    else if (this.topStar2.winStar.visible === false) this.topStar2.winStar.visible = true;
    else if (this.topStar3.winStar.visible === false) this.topStar3.winStar.visible = true;
    this.gameState.player2 = [this.topStar1.winStar.visible, this.topStar2.winStar.visible, this.topStar3.winStar.visible];
  }
  _onDraw(){
    if(this.topStar3.winStar.visible === true) this.topStar3.winStar.visible = false;
    else if (this.topStar2.winStar.visible === true) this.topStar2.winStar.visible = false;
    else if (this.topStar1.winStar.visible === true) this.topStar1.winStar.visible = false;
    this.gameState.player2 = [this.topStar1.winStar.visible, this.topStar2.winStar.visible, this.topStar3.winStar.visible];
  }

  _toClassicModeScene() {
    this.emit("toClassicModeScene")
  }

  _initEffect() {
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

  _UIEffect() {
    this.tween1.start().onComplete(() => {
      this.tween2.start();
    });
  }
  _resetResultUI(winPlayer){
    if(winPlayer == "player1") {
      this.resultTop.text = "PLAYER 1 WIN!";
      this.resultBottom.text = "PLAYER 1 WIN!";
    }
    else if(winPlayer == "player2") {
      this.resultTop.text = "PLAYER 2 WIN!";
      this.resultBottom.text = "PLAYER 2 WIN!";
    } else {
      this.resultTop.text = "Draw!";
      this.resultBottom.text = "Draw!";
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
    if (this.elapsed >= 150) {
      this._UIEffect();
      this.elapsed = 0;
    }
  }
}