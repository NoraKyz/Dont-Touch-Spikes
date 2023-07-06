import { MainUI } from "./mainUI";

export class HardModeUI extends MainUI {
  constructor() {
    super();
  }
  _initTitleUI() {
    super._initTitleUI();
    this.gameName.text = "  HARD\n MODE";
    this.gameName.style = this.titleStyle;
  }
}