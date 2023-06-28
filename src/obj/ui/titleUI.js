import { Assets, Container, Sprite, Text } from "pixi.js";
import { Game } from "../../game";
import { Data } from "../../data";

export class TitleUI extends Container {
  constructor() {
    super();
    this._initGameName();
    this._initGameInfor();
    this._initItemQuantity();
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
  }
  
  _initGameName() {
    const style = {
      fontFamily: 'Arial',
      fontWeight: 700,
      fontSize: 65,
      fill: '0x808080',
      align: 'center',
    }
    this.gameNameTop = new Text("DON'T TOUCH", style);
    this.gameNameTop.anchor.set(0.5);
    this.gameNameTop.position.set(0, -Game.app.view.height * 3 / 7 + 100);

    this.gameNameBottom = new Text("THE SPIKES", style);
    this.gameNameBottom.anchor.set(0.5);
    this.gameNameBottom.position.set(0, -Game.app.view.height * 3 / 7 + 170);
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
  }

  _updateItemQuantity(quantity){
    this.itemQuantity.text = `${Data.itemQuantity}`;
  }
  _updateBestScore(){
    if(Data.currentScore > Data.bestScore) Data.bestScore = Data.currentScore;
    this.gameInforTop.text = `BEST SCORE : ${Data.bestScore}`;
    //Data.currentScore = 0;
  }
  _updateGamePlayed(){
    this.gameInforBottom.text = `GAMES PLAYED : ${++Data.gamesPlayed}`;
  }
  updateTitleUI(){
    this._updateBestScore();
    this._updateGamePlayed();
  }

  displayGameName() {
    this.addChild(this.gameNameTop);
    this.addChild(this.gameNameBottom);
  }
  displayGameInfor() {
    this.addChild(this.itemImage);
    this.addChild(this.itemQuantity);
    this.addChild(this.gameInforTop);
    this.addChild(this.gameInforBottom);
  }
  
  hideGameName() {
    this.removeChild(this.gameNameTop);
    this.removeChild(this.gameNameBottom);
  }
  hideGameInfor() {
    this.removeChild(this.itemImage);
    this.removeChild(this.itemQuantity);
    this.removeChild(this.gameInforTop);
    this.removeChild(this.gameInforBottom);
  }


  // TODO: Không sử dụng removeChild trong UI, chỉ dùng visible

}