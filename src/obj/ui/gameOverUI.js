import * as PIXI from "pixi.js";
import {Assets, Container, Graphics, Sprite} from "pixi.js";
import {Data} from "../../data";
import {GameManager} from "../../custom/gameManager";
import { Game } from "../../game";


export class GameOverUI extends PIXI.Container {
    constructor() {
        super();
        this._initTextStyle();
        this._initPointButton();
        this._initReplayButton();
        this._initShareButton();

        this.sortChildren();
        this.zIndex = 1;
        this.gameManager = GameManager.instance;
    }

    _initTextStyle() {
        this.style = new PIXI.TextStyle({
            fill: "#FFFFFF",
            fontFamily: "Blissful Thinking",
            fontSize: 85 / Game.ratio,
            fontWeight: "lighter",
        });
    }

    _initPointButton(){
        this.pointsUI = new Container();

        this.pointsButton = Sprite.from(Assets.get("pointsUI"));
        this.pointsButton.anchor.set(0.5);
        this.pointsButton.scale.set(2 / Game.ratio);
        this.pointsButton.position.y = -130 / Game.ratio;

        this.pointNumber = new PIXI.Text(Data.currentScore, this.style);
        this.pointNumber.anchor.set(0.5);
        this.pointNumber.position.y = -150 / Game.ratio;
          
        this.pointsUI.cursor = "pointer";
        this.pointsUI.addChild(this.pointsButton);
        this.pointsUI.addChild(this.pointNumber);
        this.addChild(this.pointsUI);
    }

    _initReplayButton(){
        this.replayButton = Sprite.from(Assets.get("replayButton"));
        this.replayButton.anchor.set(0.5);     
        this.replayButton.scale.set(2 / Game.ratio);
        this.replayButton.position.y = 10 / Game.ratio;
        this.replayButton.cursor = "pointer";
        this.replayButton.eventMode = 'static';
        this.replayButton.on("pointerdown", () => this._clickedReplayButton());
        this.addChild(this.replayButton);
    }

    _clickedReplayButton() {
        this.gameManager.emit("replay");
    }

    _initShareButton(){
        this.shareButton = Sprite.from(Assets.get("shareButton"));
        this.shareButton.anchor.set(0.5);
        this.shareButton.scale.set(2 / Game.ratio);
        this.shareButton.position.y = 105 / Game.ratio;
        this.shareButton.cursor = "pointer";
        this.shareButton.on("pointerdown", () => {});
        this.addChild(this.shareButton);
    }

    onReset(){
        this.hideGameOverUI();
    }

    showGameOverUI() {
        this.pointNumber.text = Data.currentScore;
        this.visible = true;
    }

    hideGameOverUI() {
        this.visible = false;
    }

}