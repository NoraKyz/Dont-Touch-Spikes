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
    this.originColor = { color: 'ebebeb', colorDarker: '808080' };
  }

  _initBgColor(){
    this.originColor = { color: 'f3f2f5', colorDarker: 'c6bfd6' };
    this._resetBgColor(); 
  }

  _initPlayGround() {
    this._initFullPlayGround();
    this._initPlayGroundTop();
    this._initBgColor();
  }

  _initFullPlayGround() {
    this.fullPlayGround = new Graphics();
    this.fullPlayGround.beginFill(`0x${this.originColor.color}`);
    this.fullPlayGround.drawRect(- Game.app.view.width / 2, - Game.app.view.height * 3 / 7, Game.app.view.width, Game.app.view.height * 6 / 7);
    this.fullPlayGround.endFill();
    this.addChild(this.fullPlayGround);

    this.fullPlayGround.visible = false;
  }

  _initPlayGroundTop() {
    this.playGroundTop = new Graphics();
    this.playGroundTop.beginFill(`0x${this.originColor.color}`);
    this.playGroundTop.drawRect(- Game.app.view.width / 2, - Game.app.view.height * 3 / 7, Game.app.view.width, Game.app.view.height * 3 / 7);
    this.playGroundTop.endFill();
    this.addChild(this.playGroundTop);

    this.playGroundTop.visible = false;
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
    this._initScoreBgFull();
    this._initScoreBgTop();
    //score
    this.scoreText = new Text(`0${Data.currentScore}`, this.style);
    this.scoreText.anchor.set(0.5);
    this.scoreText.scale.set(4.5);
  }

  _initScoreBgFull() {
    this.scoreBgFull = new Graphics();
    this.scoreBgFull.circleRadius = 200;
    this.scoreBgFull.beginFill(0xffffff);
    this.scoreBgFull.drawCircle(0, 0, this.scoreBgFull.circleRadius);
    this.scoreBgFull.endFill();
    this.addChild(this.scoreBgFull);

    this.scoreBgFull.visible = false;
  }
  _initScoreBgTop() {
    this.scoreBgTop = new Graphics();
    this.scoreBgTop.beginFill(0xffffff);
    this.scoreBgTop.arc(0, 0, this.scoreBgFull.circleRadius, Math.PI, 0);
    this.scoreBgTop.endFill();
    this.addChild(this.scoreBgTop);

    this.scoreBgTop.visible = false;
  }

  _resetBgColor(){
    this.playGroundTop.tint = this.originColor.color;
    this.retangleTop.tint = this.originColor.colorDarker;
    this.retangleBottom.tint = this.originColor.colorDarker;
  }

  _resetScore() {
    this.scoreText.tint = 'E6E1F5';
    this.scoreText.text = `0${Data.currentScore}`;
  }

  updateBackground(newScore) {
    if (newScore < 10) this.scoreText.text = `0${newScore}`;
    else this.scoreText.text = `${newScore}`;
  }

}