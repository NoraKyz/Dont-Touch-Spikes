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
    _switchToHardMode(){
      this.switchButton = new Graphics();
      this.switchButton.circleRadius = 40 / Game.ratio;
      this.switchButton.beginFill(0x888888);
      this.switchButton.drawCircle(-300 / Game.ratio, -230 / Game.ratio, this.switchButton.circleRadius);
      this.switchButton.endFill();
  
      this.switchButton.cursor = "pointer";
      this.switchButton.eventMode = 'static';
      this.switchButton.on("pointerdown", () => this._switchToHardModeScene());
  
      this.addChild(this.switchButton);
    }
    _switchToHardModeScene(){
      this.emit("switchtohardmodescene");
    }
}