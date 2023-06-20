import { Container, Text } from "pixi.js";
import { TitleUI } from "./titleUI";

export class MainUI extends Container {
  constructor() {
    super();
    this._initTutor();
    this._initTitleUI();
  }
  _initTutor() {
    const style = {
      fontFamily: 'Arial',
      fontWeight: 700,
      fontSize: 40,
      fill: '0x909090',
      align: 'center',
    }
    this.tutorTop = new Text("TAP", style);
    this.tutorTop.anchor.set(0.5);
    this.tutorTop.position.set(0, -200);

    this.tutorBottom = new Text("TO JUMP", style);
    this.tutorBottom.anchor.set(0.5);
    this.tutorBottom.position.set(0, -160);
  }
  _initTitleUI() {
    this.titleUI = new TitleUI();
    this.addChild(this.titleUI);
  }
  displayMainUI() {
    this.titleUI.displayTitleUI();
    this.addChild(this.tutorTop);
    this.addChild(this.tutorBottom);
  }
  hideMainUI() {
    this.titleUI.hideTitleUI();
    this.removeChild(this.tutorTop);
    this.removeChild(this.tutorBottom);
  }
}