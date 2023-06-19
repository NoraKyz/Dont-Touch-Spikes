import { Container } from "pixi.js";
import { MainUI } from "./mainUI";
import { TitleUI } from "./titleUI";

export class UIManager extends Container{
  constructor(){
    super();
    this.displayMainUI();
  }
  displayMainUI(){
    this.titleUI = new TitleUI();
    this.mainUI = new MainUI();
    this.addChild(this.titleUI);
    this.addChild(this.mainUI);

    this.titleUI.displayTitleUI();
    this.mainUI.displayGameStart();
  }
}