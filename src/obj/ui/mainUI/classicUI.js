import { MainUI } from "./mainUI";


export class ClassicUI extends MainUI {
    constructor() {
      super();
    }
    _initTitleUI() {
      super._initTitleUI();
      this.gameName.text = "DON\'T TOUCH\n   THE SPIKES";
      this.gameName.style = this.titleStyle;
    }
}