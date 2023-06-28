import { Container, Text } from "pixi.js";
import { GameName } from "./gameName";
import { GameInfor } from "./gameInfor";

export class MainUI extends Container{
  constructor(){
    super();
    this._initGameTutol();
    this._initTitleUI();
    this._showMainUI();
  }
  _initTitleUI(){
    this.gameName = new GameName();
    this.addChild(this.gameName);
  }
  _initGameTutol(){
    const style = {
      fontFamily: 'Arial',
      fontWeight: 600,
      fontSize: 40,
      fill: '0x909090',
      align: 'center',
    }
    this.gameTutolTop = new Text("TAP", style);
    this.gameTutolTop.anchor.set(0.5);
    this.gameTutolTop.position.set(0, -200);
    
    this.gameTutolBottom = new Text("TO JUMP", style);
    this.gameTutolBottom.anchor.set(0.5);
    this.gameTutolBottom.position.set(0, -160);
    this.addChild(this.gameTutolTop);
    this.addChild(this.gameTutolBottom);
  }
  onReset(){
    this._showMainUI();
  }

  _showMainUI(){
    this.visible = true;
  }
  
  hideMainUI(){
    this.visible = false
  }
}