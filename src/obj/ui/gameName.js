import { Assets, Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";

export class GameName extends Container {
  constructor() {
    super();
    this._initGameName();
    this._displayGameName();
  }
  
  _initGameName() {
    const style = new TextStyle({
      fill: "#808080",
      fontFamily: "Blissful Thinking",
      fontSize: 92 / Game.ratio,
      fontWeight: 550,
      letterSpacing: 1 / Game.ratio,
  });

    this.gameName = new Text("DON\'T TOUCH\n   THE SPIKES", style);
    this.gameName.anchor.set(0.5);
    this.gameName.position.set(0, -400 / Game.ratio);
  }

  _displayGameName() {
    this.addChild(this.gameName);
  }
  
  hideGameName() {
    this.visible = false;
  }
}