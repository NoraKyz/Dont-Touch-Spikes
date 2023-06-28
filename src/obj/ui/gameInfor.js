import { Assets, Container, Sprite, Text } from "pixi.js";
import { Game } from "../../game";
import { Data } from "../../data";

export class GameInfor extends Container {
  constructor() {
    super();
    this._initGameInfor();
    this._initItemQuantity();
    this.displayGameInfor();
  }
  _initItemQuantity() {
    const style = {
      fontFamily: 'Arial',
      fontWeight: 600,
      fontSize: 60,
      fill: '0xf50c0c',
    }
    this.itemImage = Sprite.from(Assets.get("candy"));
    this.itemQuantity = new Text(`${Data.itemQuantity}`, style);
    this.itemImage.anchor.set(0.5);
    this.itemImage.scale.set(1.2);
    this.itemQuantity.anchor.set(0.5);

    this.itemImage.position.set(-40, Game.app.view.height / 7 + 65);
    this.itemQuantity.position.set(40, Game.app.view.height / 7 + 65);

    this.addChild(this.itemImage);
    this.addChild(this.itemQuantity);
  }
  
  _initGameInfor() {
    const style = {
      fontFamily: 'Arial',
      fontWeight: 600,
      fontSize: 45,
      fill: '0x808080',
      align: 'center',
    }
    this.gameInforTop = new Text(`BEST SCORE : ${Data.bestScore}`, style);
    this.gameInforTop.anchor.set(0.5);
    this.gameInforTop.position.set(0, Game.app.view.height / 7 + 130);

    this.gameInforBottom = new Text(`GAMES PLAYED : ${Data.gamesPlayed}`, style);
    this.gameInforBottom.anchor.set(0.5);
    this.gameInforBottom.position.set(0, Game.app.view.height / 7 + 180);

    this.addChild(this.gameInforTop);
    this.addChild(this.gameInforBottom);
  }

  _updateItemQuantity(){
    this.itemQuantity.text = `${Data.itemQuantity}`;
  }
  _updateBestScore(){
    if(Data.currentScore > Data.bestScore) Data.bestScore = Data.currentScore;
    this.gameInforTop.text = `BEST SCORE : ${Data.bestScore}`;
  }
  _updateGamePlayed(){
    this.gameInforBottom.text = `GAMES PLAYED : ${++Data.gamesPlayed}`;
  }
  updateGameInfor(){
    this._updateBestScore();
    this._updateGamePlayed();
    this._updateItemQuantity();
  }

  displayGameInfor() {
    this.visible = true;
  }
  hideGameInfor() {
    this.visible = false;
  }
}