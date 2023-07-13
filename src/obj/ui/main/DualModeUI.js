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
    this._initStarTop();
    this._initStarBottom();
    this._initLine();
    this._initEffect();
    this._UIEffect();
  }
  
  _initProperties() {
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
    this.stateStarTop = [false, false, false];
    this.stateStarBottom = [false, false, false];
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

    this.gameTutor = new Container();
    this.gameTutor.addChild(this.playerTop);
    this.gameTutor.addChild(this.playerBottom);
    this.gameTutor.addChild(this.tutorTop);
    this.gameTutor.addChild(this.tutorBottom);
    this.addChild(this.gameTutor);
  }

  _initLine(){
    // Làm cái line chuẩn tí nữa là được
    this.line = Sprite.from(Assets.get("line"));
    this.line.anchor.set(0.5);
    this.line.scale.set(0.3);
    this.line.position.set(0, 0);
    this.addChild(this.line);
  }


  _initBackButton() {
    this.backButton = Sprite.from(Assets.get("undoButton"));
    this.backButton.anchor.set(0.5);
    this.backButton.scale.set(0.15);
    this.backButton.position.set(-290, -420);

    this.backButton.cursor = "pointer";
    this.backButton.eventMode = 'static';
    this.backButton.on("pointerdown", () => this._toClassicModeScene());

    this.addChild(this.backButton);
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
    this.addChild(this.topStar1);
    this.addChild(this.topStar2);
    this.addChild(this.topStar3);
  }
  _initStarBottom(){
    this.bottomStar1 = this._initStar({x: -60, y: 140});
    this.bottomStar2 = this._initStar({x: 0, y: 138});
    this.bottomStar3 = this._initStar({x: 60, y: 140});
    this.addChild(this.bottomStar1);
    this.addChild(this.bottomStar2);
    this.addChild(this.bottomStar3);
  }

  onPlayer1Win(){
    if(this.bottomStar1.winStar.visible === false) this.bottomStar1.winStar.visible = true;
    else if (this.bottomStar2.winStar.visible === false) this.bottomStar2.winStar.visible = true;
    else if (this.bottomStar3.winStar.visible === false) this.bottomStar3.winStar.visible = true;
    this.stateStarBottom = [this.bottomStar1.winStar.visible, this.bottomStar2.winStar.visible, this.bottomStar3.winStar.visible];
  }
  onPlayer2Win(){
    if(this.topStar1.winStar.visible === false) this.topStar1.winStar.visible = true;
    else if (this.topStar2.winStar.visible === false) this.topStar2.winStar.visible = true;
    else if (this.topStar3.winStar.visible === false) this.topStar3.winStar.visible = true;
    this.stateStarTop = [this.topStar1.winStar.visible, this.topStar2.winStar.visible, this.topStar3.winStar.visible];
  }

  _toClassicModeScene() {
    this.emit("toClassicModeScene")
  }

  _initEffect(){
    this.elapsed = 0;
    this.tween1 = new TWEEN.Tween(this.gameTutor)
      .to({alpha: 0}, 1000)
    this.tween2 = new TWEEN.Tween(this.gameTutor)
      .to({alpha: 1}, 1000);
  }

  onReset(){
    this.stateStarTop = [];
    this.stateStarBottom = [];
  }

  _UIEffect(){ 
    this.tween1.start().onComplete(() => {
      this.tween2.start();
    });
  }
  
  update(dt){
    this.elapsed += dt;
    if(this.elapsed >= 150){
      this._UIEffect();
      this.elapsed = 0;
    }
  }
}