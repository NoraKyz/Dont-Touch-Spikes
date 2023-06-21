import { Container, Text } from "pixi.js";
import { Game } from "../../game";

export class MainUI extends Container{
  constructor(){
    super();
    this._initGameStart();
  }
  _initGameStart(){
    const style = {
      fontFamily: 'Arial',
      fontWeight: 700,
      fontSize: 40,
      fill: '0x909090',
      align: 'center',
    }
    this.gameStartTop = new Text("TAP", style);
    this.gameStartTop.anchor.set(0.5);
    this.gameStartTop.position.set(0, -200);
    
    this.gameStartBottom = new Text("TO JUMP", style);
    this.gameStartBottom.anchor.set(0.5);
    this.gameStartBottom.position.set(0, -160);
  }
  displayGameStart(){
    this.addChild(this.gameStartTop);
    this.addChild(this.gameStartBottom);
  }
  hideGameStart(){
    this.removeChild(this.gameStartTop);
    this.removeChild(this.gameStartBottom);
  }
}