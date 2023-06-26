import { Container, Sprite, Text } from "pixi.js";
import { Game } from "../../game";

export class TitleUI extends Container{
  constructor(){
    super();
    this._initGameName();
    this._initGameInfor();
    this._initItemQuantity();
  }
  _initItemQuantity(){
    const style = {
      fontFamily: 'Arial',
      fontWeight: 600,
      fontSize: 60,
      fill: '0xf50c0c',
      
    }
    this.itemImage = Sprite.from('../assets/images/keo.png');
    this.itemImage.width = 90;
    this.itemImage.height = 90;
    this.itemQuantity = new Text(`36`, style);
    this.itemImage.anchor.set(0.5);

    this.itemImage.position.set(-35, Game.app.view.height / 7 + 60);
    this.itemQuantity.position.set(10, Game.app.view.height / 7 + 35);
  }
  _initGameName(){
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
  _initGameInfor(){
    this.bestScore = 20;
    this.gamesPlayed = 31;
    const style = {
      fontFamily: 'Arial',
      fontWeight: 600,
      fontSize: 45,
      fill: '0x808080',
      align: 'center',
    }
    this.gameInforTop = new Text(`BEST SCORE : ${this.bestScore}`, style);
    this.gameInforTop.anchor.set(0.5);
    this.gameInforTop.position.set(0, Game.app.view.height / 7 + 130);
    
    this.gameInforBottom = new Text(`GAMES PLAYED : ${this.gamesPlayed}`, style);
    this.gameInforBottom.anchor.set(0.5);
    this.gameInforBottom.position.set(0, Game.app.view.height / 7 + 180);
  }

  displayGameName(){
    this.addChild(this.gameNameTop);
    this.addChild(this.gameNameBottom);
<<<<<<< HEAD
  }
  hideGameName(){
    this.removeChild(this.gameNameTop);
    this.removeChild(this.gameNameBottom);
  }

  displayGameInfor(){
=======
>>>>>>> a46f6f4 (add candy at mainUI + fixbug)
    this.addChild(this.itemImage);
    this.addChild(this.itemQuantity);
    this.addChild(this.gameInforTop);
    this.addChild(this.gameInforBottom);
  }
  hideTitleUI(){
    this.removeChild(this.itemImage);
    this.removeChild(this.itemQuantity);
    this.removeChild(this.gameInforTop);
    this.removeChild(this.gameInforBottom);
  }
}