import {Assets, Container, Graphics, Sprite, Text, TextStyle} from "pixi.js";
import {MainUI} from "./mainUI.js";
import { Game } from "../../../game.js";
import * as TWEEN from '@tweenjs/tween.js'

export class DualModeUI extends MainUI {
  constructor() {
    super();
  }

  _initComponent() {
    this._initProperties();
    this._initBackButton();
    this._initGameTutol();
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