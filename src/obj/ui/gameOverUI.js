import * as PIXI from "pixi.js";
import {Assets, Container, Graphics, Sprite} from "pixi.js";
import {Data} from "../../data";
import {GameManager} from "../../custom/gameManager";
import { Game } from "../../game";


export class GameOverUI extends PIXI.Container {
    constructor() {
        super();
        this.BUTTON = Object.freeze({
            x: -280 / Game.ratio,
            y: -45 / Game.ratio,
            width: 560 / Game.ratio,
            height: 90 / Game.ratio,
            radius: 16 / Game.ratio,
        });
        this.style = {
            fontFamily: "Calibri",
            fill: ['#ffffff'],
            align: "center",
        }
        this.bigTextStyle = new PIXI.TextStyle({
            ...this.style,
            fontSize: 65 / Game.ratio,
        });
        this._initPointButton();
        this._initReplayButton();
        this._initShareButton();

        this.sortChildren();
        this.zIndex = 1;
        this.gameManager = GameManager.instance;
    }

    _initPointButton(){

        this.pointsButtonBar = new PIXI.Container();
        this.pointText = new PIXI.TextStyle({
            ...this.style,
            fontSize: 60 / Game.ratio,
        });
        this.pointNum = new PIXI.TextStyle({
            ...this.style,
            fontSize: 115 / Game.ratio,
            fontWeight: "bold",
        });

        this.pointsButton = new Graphics();
        this.pointsButton.beginFill(0xff2727);
        this.pointsButton.drawRoundedRect(this.BUTTON.x, this.BUTTON.y, this.BUTTON.width, this.BUTTON.height*2, this.BUTTON.radius);
        this.pointsButton.endFill();
        this.pointsButton.zIndex = 1;
        this.pointsButtonBar.addChild(this.pointsButton);

        this.pointsButtonNum = new PIXI.Text(Data.currentScore, this.pointNum);
        this.pointsButtonNum.position.set(this.BUTTON.x + 278 / Game.ratio, this.BUTTON.y + 61 / Game.ratio);
        this.pointsButtonNum.anchor.set(0.5);
        this.pointsButtonNum.zIndex = 2;
        this.pointsButtonBar.addChild(this.pointsButtonNum);

        this.pointsButtonText = new PIXI.Text("POINTS", this.pointText);
        this.pointsButtonText.position.set(this.BUTTON.x + 278 / Game.ratio, this.BUTTON.y + 136 / Game.ratio);
        this.pointsButtonText.anchor.set(0.5);
        this.pointsButtonText.zIndex = 2;
        this.pointsButtonBar.addChild(this.pointsButtonText);
        this._decoratePointButton();

        this.pointsButtonBar.cursor = "pointer";
        this.pointsButtonBar.position.set(0, -220 / Game.ratio);

        this.addChild(this.pointsButtonBar);
    }

    _decoratePointButton() {
        this.leftDecoration = new Container();
        this.buttonDecorationLeft = new Graphics();
        this.buttonDecorationLeft.beginFill(0xd11515);
        this.buttonDecorationLeft.drawRoundedRect(this.BUTTON.x+25 / Game.ratio, this.BUTTON.y+25 / Game.ratio, 130 / Game.ratio,130 / Game.ratio, this.BUTTON.radius);
        this.buttonDecorationLeft.endFill();
        this.buttonDecorationLeft.zIndex = 2;
        this.imageDecorationLeft = Sprite.from(Assets.get("trophy"));
        this.imageDecorationLeft.zIndex = 3;
        this.imageDecorationLeft.anchor.set(0.5);
        this.imageDecorationLeft.scale.set(0.2 / Game.ratio);
        this.imageDecorationLeft.position.set(this.BUTTON.x+90 / Game.ratio, this.BUTTON.y+90 / Game.ratio);
        this.leftDecoration.addChild(this.buttonDecorationLeft);
        this.leftDecoration.addChild(this.imageDecorationLeft);

        this.rightDecoration = new Container();
        this.buttonDecorationRight = new Graphics();
        this.buttonDecorationRight.beginFill(0xd11515);
        this.buttonDecorationRight.drawRoundedRect(this.BUTTON.x+405 / Game.ratio, this.BUTTON.y+25 / Game.ratio, 130 / Game.ratio,130 / Game.ratio, this.BUTTON.radius);
        this.buttonDecorationRight.endFill();
        this.buttonDecorationRight.zIndex = 2;
        this.imageDecorationRight = Sprite.from(Assets.get("leaderBoard"));
        this.imageDecorationRight.zIndex = 3;
        this.imageDecorationRight.anchor.set(0.5);
        this.imageDecorationRight.scale.set(2 / Game.ratio);
        this.imageDecorationRight.position.set(this.BUTTON.x+470 / Game.ratio, this.BUTTON.y+90 / Game.ratio);
        this.rightDecoration.addChild(this.buttonDecorationRight);
        this.rightDecoration.addChild(this.imageDecorationRight);

        this.pointsButtonBar.addChild(this.rightDecoration);
        this.pointsButtonBar.addChild(this.leftDecoration);
    }

    _initReplayButton(){
        this.replayButtonBar = new PIXI.Container();

        this.replayButton = new Graphics();
        this.replayButton.beginFill(0xff2727);
        this.replayButton.drawRoundedRect(this.BUTTON.x, this.BUTTON.y, this.BUTTON.width, this.BUTTON.height, this.BUTTON.radius);
        this.replayButton.endFill();
        this.replayButton.zIndex = 1;
        this.replayButtonBar.addChild(this.replayButton);

        this.replayButtonText = new PIXI.Text("REPLAY", this.bigTextStyle);
        this.replayButtonText.anchor.set(0.5);
        this.replayButtonText.zIndex = 2;
        this.replayButtonBar.addChild(this.replayButtonText);

        this.replayButtonBar.eventMode = 'static';
        this.replayButtonBar.cursor = "pointer";
        this.replayButtonBar.on("pointerdown", () => this._clickedReplayButton());
        this.replayButtonBar.position.set(0, -30 / Game.ratio);
        this.addChild(this.replayButtonBar);
    }

    _clickedReplayButton() {
        this.gameManager.emit("replay");
    }

    _initShareButton(){
        this.shareButtonBar = new PIXI.Container();
        this.shareButton = new Graphics();
        this.shareButton.beginFill(0xff2727);
        this.shareButton.drawRoundedRect(this.BUTTON.x, this.BUTTON.y, this.BUTTON.width, this.BUTTON.height, this.BUTTON.radius);
        this.shareButton.endFill();
        this.shareButton.zIndex = 1;
        this.shareButtonBar.addChild(this.shareButton);

        this.shareButtonText = new PIXI.Text("SHARE", this.bigTextStyle);
        this.shareButtonText.anchor.set(0.5);
        this.shareButtonText.zIndex = 2;
        this.shareButtonBar.addChild(this.shareButtonText);

        this.shareButtonBar.cursor = "pointer";
        this.shareButtonBar.on("pointerdown", () => {});
        this.shareButtonBar.position.set(0, 70 / Game.ratio);
        this.addChild(this.shareButtonBar);
    }
    onReset(){
        this.hideGameOverUI();
    }

    showGameOverUI() {
        this.pointsButtonNum.text = Data.currentScore;
        this.visible = true;
    }

    hideGameOverUI() {
        this.visible = false;
    }

}