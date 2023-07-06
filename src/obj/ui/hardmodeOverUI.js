import { GameOverUI } from "./OverUI";


export class HardmodeOverUI extends GameOverUI {
    constructor() {
        super();
    }
    _initTitleUI() {
      super._initTitleUI();
      this.gameName.text = "  HARD\n MODE";
      this.gameName.style = this.titleStyle;
    }
}