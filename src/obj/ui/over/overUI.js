import * as PIXI from "pixi.js";
import { Assets, Container, Sprite } from "pixi.js";
import { Data } from "../../../data";

export class OverUI extends PIXI.Container {
    constructor() {
        super();
        
        this._initTextStyle();
        this._initPointButton();
        this._initReplayButton();
        this._initShareButton();
        this._initTitleUI();
        
        this.sortChildren();
        this.zIndex = 1;
    }

    _initTextStyle() {
        this.style = new PIXI.TextStyle({
            fill: "#FFFFFF",
            fontFamily: "Blissful Thinking",
            fontSize: 85 ,
            fontWeight: "lighter",
            letterSpacing: 1 ,
        });
    }
    _initTitleUI() {
        this.titleStyle = new PIXI.TextStyle({
            ...this.style,
            fill: "#808080",
            fontSize: 92 ,
            fontWeight: 550,
        });

        this.gameName = new PIXI.Text();
        this.gameName.anchor.set(0.5);
        this.gameName.position.set(0, -400 );
        this.addChild(this.gameName);
    }

    _initPointButton() {
        this.pointsUI = new Container();

        this.pointsButton = Sprite.from(Assets.get("pointsUI"));
        this.pointsButton.anchor.set(0.5);
        this.pointsButton.scale.set(1 );
        this.pointsButton.position.y = -130 ;

        this.pointNumber = new PIXI.Text(Data.currentScore, this.style);
        this.pointNumber.anchor.set(0.5);
        this.pointNumber.position.y = -150 ;

        this.pointsUI.cursor = "pointer";
        this.pointsUI.addChild(this.pointsButton);
        this.pointsUI.addChild(this.pointNumber);
        this.addChild(this.pointsUI);
    }

    _initReplayButton() {
        this.replayButton = Sprite.from(Assets.get("replayButton"));
        this.replayButton.anchor.set(0.5);
        this.replayButton.scale.set(1 );
        this.replayButton.position.y = 10 ;
        this.replayButton.cursor = "pointer";
        this.replayButton.eventMode = 'static';
        this.replayButton.on("pointertap", () => this._clickedReplayButton());
        this.addChild(this.replayButton);
    }

    // abstract
    _clickedReplayButton() { }

    _initShareButton() {
        this.shareButton = Sprite.from(Assets.get("shareButton"));
        this.shareButton.anchor.set(0.5);
        this.shareButton.scale.set(1 );
        this.shareButton.position.y = 105 ;
        this.shareButton.cursor = "pointer";
        this.shareButton.on("pointertap", () => { });
        this.addChild(this.shareButton);
    }

    onReset() {
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