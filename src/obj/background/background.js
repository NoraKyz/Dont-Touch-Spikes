import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";
import { CommonUtils } from "../../commonUtils.js";
import { Data } from "../../data";
import * as TWEEN from "@tweenjs/tween.js";

export class Background extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponent();
    }

    _initProperties() {
        this.alpha = 0.95;
        this.eventMode = 'static';
        this.originColor = { color: 'ebebeb', colorDarker: '808080' };
        this._initTextStyle();
    }

    _initComponent() {
        this._initRetangleTop();
        this._initRetangleBottom();
        this._initPlayGround();
        this._initScore();
    }

    _initTextStyle() {
        this.style = new TextStyle({
            fontFamily: "Courier New",
            fontWeight: "bolder",
            fontSize: 65,
            fill: `0x${this.originColor.color}`,
        });
    }

    _initPlayGround() {
        this.playGround = new Graphics();
        this.playGround.beginFill(`0x${this.originColor.color}`);
        this.playGround.drawRect(- Game.app.view.width / 2, -Game.app.view.height * 3 / 7, Game.app.view.width, Game.app.view.height * 5.5 / 7);
        this.playGround.endFill();
        this.addChild(this.playGround);
    }

    _initRetangleTop() {
        this.retangleTop = new Graphics();
        this.retangleTop.beginFill(`0x${this.originColor.colorDarker}`);
        this.retangleTop.drawRect(-Game.app.view.width / 2, -Game.app.view.height / 2, Game.app.view.width, Game.app.view.height / 14);
        this.retangleTop.endFill();
        this.addChild(this.retangleTop);
    }

    _initRetangleBottom() {
        this.retangleBottom = new Graphics();
        this.retangleBottom.beginFill(`0x${this.originColor.colorDarker}`);
        this.retangleBottom.drawRect(-Game.app.view.width / 2, Game.app.view.height * 2.5 / 7, Game.app.view.width, Game.app.view.height / 7);
        this.retangleBottom.endFill();
        this.addChild(this.retangleBottom);
    }

    _initScore() {
        // score background
        this.scoreBg = new Graphics();
        this.scoreBg.circleRadius = 200;
        this.scoreBg.beginFill(0xffffff);
        this.scoreBg.drawCircle(0, -Game.app.view.height / 28, this.scoreBg.circleRadius);
        this.scoreBg.endFill();
        this.addChild(this.scoreBg);

        // score
        this.scoreText = new Text(`0${Data.currentScore}`, this.style);
        this.scoreText.anchor.set(0.5);
        this.scoreText.y = -Game.app.view.height / 28;
        this.scoreText.scale.set(4.5);
    }

    updateBackground(newScore) {

        if (newScore < 10) this.scoreText.text = `0${newScore}`;
        else this.scoreText.text = `${newScore}`;

        if (newScore > 0 && newScore % 5 == 0) this.changeBgColor();
    }

    _newColor() {
        return CommonUtils.randomColorBackground();
    }

    _resetProperties() {
        this.originColor = { color: 'FFFFFF', colorDarker: 'FFFFFF' };
    }

    _resetBgColor() {
        this.scoreText.style.fill = this.originColor.color;
        this.playGround.tint = this.originColor.color;
        this.retangleTop.tint = this.originColor.colorDarker;
        this.retangleBottom.tint = this.originColor.colorDarker;
    }

    _resetScore() {
        this.scoreText.tint = 'ebebeb';
        this.scoreText.text = `0${Data.currentScore}`;
    }

    _changeColorEffect(targetColor) {
        this.changeColorEffect = new TWEEN.Tween({ ratio: 0 })
            .to({ ratio: 1 }, 1500)
            .onUpdate((val) => {
                let nextColor = CommonUtils.lerpColor(this.originColor.color, targetColor.color, val.ratio);
                let nextColorDarker = CommonUtils.lerpColor(this.originColor.colorDarker, targetColor.colorDarker, val.ratio);
                this.scoreText.style.fill = nextColor;
                this.playGround.tint = nextColor;
                this.retangleTop.tint = nextColorDarker;
                this.retangleBottom.tint = nextColorDarker;
            })
            .onComplete(() => {
                this.originColor = targetColor;
            })
            .start();
    }

    changeBgColor() {
        this.targetColor = this._newColor();
        this._changeColorEffect(this.targetColor);
    }

    onReset() {
        this._resetProperties();
        this._resetBgColor();
        this._resetScore();
    }

    displayScore() {
        this.addChild(this.scoreText);
    }

    hideScore() {
        this.removeChild(this.scoreText);
    }

    hideScoreBackground() {
        this.scoreBg.visible = false;
    }

    showScoreGround() {
        this.scoreBg.visible = true;
    }
}