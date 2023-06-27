import { Container, Text } from "pixi.js";
import { Game } from "../../game";
import { TitleUI } from "./titleUI";

export class MainUI extends Container{
  constructor(){
    super();
    this._initGameTutol();
    this._initTitleUI();
    this._displayMainUI();
  }
  _initTitleUI(){
    this.titleUI = new TitleUI();
    this.addChild(this.titleUI);
    this.titleUI.displayGameName();
    this.titleUI.displayGameInfor();
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
  }

  _displayMainUI(){
    this.addChild(this.gameTutolTop);
    this.addChild(this.gameTutolBottom);
  }
  
  hideMainUI(){
    this.titleUI.hideTitleUI();
    this.removeChild(this.gameTutolTop);
    this.removeChild(this.gameTutolBottom);
  }

  // TODO: Không sử dụng removeChild trong UI, chỉ dùng visible
}