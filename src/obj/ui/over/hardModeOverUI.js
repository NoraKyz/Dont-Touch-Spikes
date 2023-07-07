import { Assets } from "pixi.js";
import { OverUI } from "./overUI";

export class HardModeOverUI extends OverUI {
  constructor() {
    super();
  }

  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "  HARD\n MODE";
    this.gameName.style = this.titleStyle;
  }

  _clickedReplayButton() {
    Assets.get("replayButtonSound").play();
    this.emit("replay");
  }
}