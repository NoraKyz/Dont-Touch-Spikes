import { Assets } from "pixi.js";
import { GameOverUI } from "./OverUI";


export class ClassicOverUI extends GameOverUI {
    constructor() {
      super();
    }
    _initTitleUI() {
      super._initTitleUI();
      this.gameName.text = "DON\'T TOUCH\n   THE SPIKES";
      this.gameName.style = this.titleStyle;
    }

    _clickedReplayButton() {
      Assets.get("replayButtonSound").play();
      this.emit("replay");
  }
}