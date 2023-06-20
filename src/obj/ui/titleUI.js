import { Container, Text } from "pixi.js";
import { Game } from "../../game";

export class TitleUI extends Container{
  constructor(){
    super();
    this._initGameName();
    this._initGameInfor();
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
  
  displayTitleUI(){
    this.addChild(this.gameNameTop);
    this.addChild(this.gameNameBottom);
    this.addChild(this.gameInforTop);
    this.addChild(this.gameInforBottom);
  }

  hideTitleUI(){
    this.removeChild(this.gameNameTop);
    this.removeChild(this.gameNameBottom);
    this.removeChild(this.gameInforTop);
    this.removeChild(this.gameInforBottom);
  }
}