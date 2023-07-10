import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";
import { Data } from "../../data";
import {Background} from "./background";

export class BackgroundDual extends Background {
  constructor() {
    super();
  }

  _initProperties() {
    super._initProperties();
    this.eventMode = 'static';
    this.originColor = { color: 'E6E1F5', colorDarker: '6C6381' };
  }


  _initPlayGround() {
    this._initPlayGroundTop();
    this._initPlayGroundBottom();
  }

  _initPlayGroundTop() {
    this.playGroundTop = new Graphics();
    this.playGroundTop.beginFill(`0x${this.originColor.color}`);
    this.playGroundTop.drawRect(- Game.app.view.width / 2, - Game.app.view.height * 3 / 7, Game.app.view.width, Game.app.view.height * 3 / 7);
    this.playGroundTop.endFill();
    this.addChild(this.playGroundTop);
  }

  _initPlayGroundBottom() {
    this.playGroundBottom = new Graphics();
    this.playGroundBottom.beginFill(`0x${this.originColor.color}`);
    this.playGroundBottom.drawRect(- Game.app.view.width / 2, 0, Game.app.view.width, Game.app.view.height * 3 / 7);
    this.playGroundBottom.endFill();
    this.addChild(this.playGroundBottom);
  }

  _initRetangleTop() {
    this.retangleTop = new Graphics();
    this.retangleTop.beginFill(`0x${this.originColor.colorDarker}`);
    this.retangleTop.drawRect(-Game.app.view.width / 2, -Game.app.view.height / 2, Game.app.view.width, Game.app.view.height / 14);
    this.retangleTop.endFill();
    this.addChild(this.retangleTop);
  }

  _initRetangleBottom() {
    this.retangleBottom = new Graphics();
    this.retangleBottom.beginFill(`0x${this.originColor.colorDarker}`);
    this.retangleBottom.drawRect(-Game.app.view.width / 2, Game.app.view.height * 3 / 7, Game.app.view.width, Game.app.view.height / 14);
    this.retangleBottom.endFill();
    this.addChild(this.retangleBottom);
  }
  _initScore() {
    //circle
    this.scoreBg = new Graphics();
    this.scoreBg.circleRadius = 200;
    this.scoreBg.beginFill(0xffffff);
    this.scoreBg.drawCircle(0, 0, this.scoreBg.circleRadius);
    this.scoreBg.endFill();
    this.addChild(this.scoreBg);
    //score
    this.scoreText = new Text(`0${Data.currentScore}`, this.style);
    this.scoreText.anchor.set(0.5);
    this.scoreText.y = -Game.app.view.height / 28;
    this.scoreText.scale.set(4.5);
  }

  _resetScore() {
    this.scoreText.tint = 'E6E1F5';
    this.scoreText.text = `0${Data.currentScore}`;
  }

  _resetProperties() {
    super._resetProperties();
  }

  updateBackground(newScore) {
    if (newScore < 10) this.scoreText.text = `0${newScore}`;
    else this.scoreText.text = `${newScore}`;
  }

}