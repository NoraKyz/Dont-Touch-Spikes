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

        this.pointsUI = Sprite.from(Assets.get("pointsUI"));
        this.pointsUI.cursor = "pointer";
        this.pointsUI.position.set(0, -220 / Game.ratio);

        this.addChild(this.pointsUI);
    }

    _initReplayButton(){
        this.replayButton = Sprite.from(Assets.get("replayButton"));

        this.replayButton.eventMode = 'static';
        this.replayButton.cursor = "pointer";
        this.replayButton.on("pointerdown", () => this._clickedReplayButton());
        this.replayButton.position.set(0, -30 / Game.ratio);
        this.addChild(this.replayButton);
    }

    _clickedReplayButton() {
        this.gameManager.emit("replay");
    }

    _initShareButton(){
        this.shareButton = Sprite.from(Assets.get("shareButton"));

        this.shareButton.cursor = "pointer";
        this.shareButton.on("pointerdown", () => {});
        this.shareButton.position.set(0, 70 / Game.ratio);
        this.addChild(this.shareButton);
    }

    onReset(){
        this.hideGameOverUI();
    }

    showGameOverUI() {
        //this.pointsButtonNum.text = Data.currentScore;
        this.visible = true;
    }

    hideGameOverUI() {
        this.visible = false;
    }

}