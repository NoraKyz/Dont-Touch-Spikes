import * as PIXI from "pixi.js";
import { TitleUI } from "./titleUI";
import {Graphics} from "pixi.js";
import {Data} from "../../data";

const BUTTON = Object.freeze({
    x: -280,
    y: -45,
    width: 560,
    height: 90,
    radius: 16, // for rounded rectangle
});
export class GameOverUI extends PIXI.Container {
    constructor() {
        super();
        this.bigTextStyle = new PIXI.TextStyle({
            fontFamily: "Calibri",
            fontSize: 65,
            fill: ['#ffffff'],
            align: "center",
        });
        this._initPointButton();
        this._initReplayButton();
        this._initShareButton();

        this.sortChildren();
        this.zIndex = 1;
        this._initTitleUI();
    }

    _initPointButton(){

        this.pointsButtonBar = new PIXI.Container();
        this.pointText = new PIXI.TextStyle({
            fontFamily: "Calibri",
            fontSize: 45,
            fill: ['#ffffff'],
            align: "center",
        });
        this.pointNum = new PIXI.TextStyle({
            fontFamily: "Calibri",
            fontSize: 115,
            fill: ['#ffffff'],
            align: "center",
            fontWeight: "bold",
        });

        this.pointsButton = new Graphics();
        this.pointsButton.beginFill(0xff2727);
        this.pointsButton.drawRoundedRect(BUTTON.x, BUTTON.y, BUTTON.width,BUTTON.height*2, BUTTON.radius);
        this.pointsButton.endFill();
        this.pointsButton.zIndex = 1;
        this.pointsButtonBar.addChild(this.pointsButton);

        this.pointsButtonNum = new PIXI.Text(Data.currentScore, this.pointNum);
        this.pointsButtonNum.position.set(BUTTON.x + 278, BUTTON.y + 61);
        this.pointsButtonNum.anchor.set(0.5);
        this.pointsButtonNum.zIndex = 2;
        this.pointsButtonBar.addChild(this.pointsButtonNum);

        this.pointsButtonText = new PIXI.Text("POINTS", this.pointText);
        this.pointsButtonText.position.set(BUTTON.x + 278, BUTTON.y + 136);
        this.pointsButtonText.anchor.set(0.5);
        this.pointsButtonText.zIndex = 2;
        this.pointsButtonBar.addChild(this.pointsButtonText);
        this._decoratePointButton();

        this.pointsButtonBar.cursor = "pointer";
        this.pointsButtonBar.on("pointerdown", () => {});
        this.pointsButtonBar.position.set(0, -220);

        this.addChild(this.pointsButtonBar);
    }

    _decoratePointButton() {
        this.buttonDecorationLeft = new Graphics();
        this.buttonDecorationLeft.beginFill(0xd11515);
        this.buttonDecorationLeft.drawRoundedRect(BUTTON.x+25, BUTTON.y+25, 130,130, BUTTON.radius);
        this.buttonDecorationLeft.endFill();
        this.buttonDecorationLeft.zIndex = 2;
        this.pointsButtonBar.addChild(this.buttonDecorationLeft);

        this.buttonDecorationRight = new Graphics();
        this.buttonDecorationRight.beginFill(0xd11515);
        this.buttonDecorationRight.drawRoundedRect(BUTTON.x+405, BUTTON.y+25, 130,130, BUTTON.radius);
        this.buttonDecorationRight.endFill();
        this.buttonDecorationRight.zIndex = 2;
        this.pointsButtonBar.addChild(this.buttonDecorationRight);
    }
    _initReplayButton(){
        this.replayButtonBar = new PIXI.Container();

        this.replayButton = new Graphics();
        this.replayButton.beginFill(0xff2727);
        this.replayButton.drawRoundedRect(BUTTON.x, BUTTON.y, BUTTON.width,BUTTON.height, BUTTON.radius);
        this.replayButton.endFill();
        this.replayButton.zIndex = 1;
        this.replayButtonBar.addChild(this.replayButton);

        this.replayButtonText = new PIXI.Text("REPLAY", this.bigTextStyle);
        this.replayButtonText.anchor.set(0.5);
        this.replayButtonText.zIndex = 2;
        this.replayButtonBar.addChild(this.replayButtonText);

        this.replayButtonBar.cursor = "pointer";
        this.replayButtonBar.on("pointerdown", () => {});
        this.replayButtonBar.position.set(0, -30);
        this.addChild(this.replayButtonBar);
    }
    _initShareButton(){
        this.shareButtonBar = new PIXI.Container();
        //hình dáng button
        this.shareButton = new Graphics();
        this.shareButton.beginFill(0xff2727);
        this.shareButton.drawRoundedRect(BUTTON.x, BUTTON.y, BUTTON.width,BUTTON.height, BUTTON.radius);
        this.shareButton.endFill();
        this.shareButton.zIndex = 1;
        this.shareButtonBar.addChild(this.shareButton);

        this.shareButtonText = new PIXI.Text("SHARE", this.bigTextStyle);
        this.shareButtonText.anchor.set(0.5);
        this.shareButtonText.zIndex = 2;
        this.shareButtonBar.addChild(this.shareButtonText);

        this.shareButtonBar.cursor = "pointer";
        this.shareButtonBar.on("pointerdown", () => {});
        this.shareButtonBar.position.set(0, 70);
        this.addChild(this.shareButtonBar);
    }
    _initTitleUI(){
        this.titleUI = new TitleUI();
        this.addChild(this.titleUI);
        this.titleUI.displayGameInfor();
    }

    _show() {
        this.visible = true;
    }

    _hide() {
        this.visible = false;
    }
}