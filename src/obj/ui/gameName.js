import { Container, Text } from "pixi.js";
import { Game } from "../../game";

export class GameName extends Container {
  constructor() {
    super();
    this._initGameName();
    this._displayGameName();
  }
  
  _initGameName() {
    const style = {
      fontFamily: 'Arial',
      fontWeight: 700,
      fontSize: 65 / Game.ratio,
      fill: '0x808080',
      align: 'center',
    }
    this.gameNameTop = new Text("DON'T TOUCH", style);
    this.gameNameTop.anchor.set(0.5);
    this.gameNameTop.position.set(0, -Game.app.view.height * 3 / 7 + 100 / Game.ratio);

    this.gameNameBottom = new Text("THE SPIKES", style);
    this.gameNameBottom.anchor.set(0.5);
    this.gameNameBottom.position.set(0, -Game.app.view.height * 3 / 7 + 170 / Game.ratio);
  }

  _displayGameName() {
    this.addChild(this.gameNameTop);
    this.addChild(this.gameNameBottom);
  }
  
  hideGameName() {
    this.visible = false;
  }

}