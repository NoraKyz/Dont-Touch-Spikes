import { Container, Text, TextStyle } from "pixi.js";
import { GameName } from "./gameName";
import { Game } from "../../game";

export class MainUI extends Container {
  constructor() {
    super();
    this._initTextStyle();
    this._initGameTutol();
    this._initTitleUI();
    this._showMainUI();
  }
  _initTitleUI() {
    this.gameName = new GameName();
    this.addChild(this.gameName);
  }

  _initTextStyle() {
    this.style = new TextStyle({
      fill: "#808080",
      fontFamily: "Blissful Thinking",
      fontSize: 55 / Game.ratio,
      fontWeight: "lighter",
      letterSpacing: 1 / Game.ratio,
    });
  }

  _initGameTutol() {
    this.gameTutorial = new Text("    TAP \nTO JUMP", this.style);
    this.gameTutorial.anchor.set(0.5);
    this.gameTutorial.position.set(0, - 165 / Game.ratio);
    this.addChild(this.gameTutorial);
  }
  onReset() {
    this._showMainUI();
  }

  _showMainUI() {
    this.visible = true;
  }

  hideMainUI() {
    this.visible = false
  }
}