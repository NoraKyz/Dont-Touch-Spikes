import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { Game } from "../../game";
import { CommonUtils } from "../../commonUtils.js";
import { Data } from "../../data";

export class Background extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initRetangleTop();
        this._initRetangleBottom();
        this._initPlayGround();
        this._initScoreBg();

        this.ok = 0;
    }

    _initProperties() {
        this.mainColor = { color: 'ebebeb', colorDarker: '808080' };
    }

    _initPlayGround() {
        this.playGround = new Graphics();
        this.playGround.beginFill(`0x${this.mainColor.color}`);
        this.playGround.drawRect(- Game.app.view.width / 2, -Game.app.view.height * 3 / 7, Game.app.view.width, Game.app.view.height * 5.5 / 7);
        this.playGround.endFill();
        this.addChild(this.playGround);
    }

    _initRetangleTop() {
        this.retangleTop = new Graphics();
        this.retangleTop.beginFill(`0x${this.mainColor.colorDarker}`);
        this.retangleTop.drawRect(-Game.app.view.width / 2, -Game.app.view.height / 2, Game.app.view.width, Game.app.view.height / 14);
        this.retangleTop.endFill();
        this.addChild(this.retangleTop);
    }

    _initRetangleBottom() {
        this.retangleBottom = new Graphics();
        this.retangleBottom.beginFill(`0x${this.mainColor.colorDarker}`);
        this.retangleBottom.drawRect(-Game.app.view.width / 2, Game.app.view.height * 2.5 / 7, Game.app.view.width, Game.app.view.height / 7);
        this.retangleBottom.endFill();
        this.addChild(this.retangleBottom);
    }

    _initScoreBg() {
        // circle
        this.scoreBg = new Graphics();
        this.scoreBg.circleRadius = 200;
        this.scoreBg.beginFill(0xffffff);
        this.scoreBg.drawCircle(0, -Game.app.view.height / 28, this.scoreBg.circleRadius);
        this.scoreBg.endFill();
        this.addChild(this.scoreBg);

        // score
        this.scoreText = new Text(`${Data.currentScore}`, {
            fontFamily: 'Montserrat',
            fontWeight: 1000,
            fontSize: 50,
            fill: `0x${this.mainColor.color}`,
            opacity: 0.5,
        });
        this.scoreText.anchor.set(0.5);
        this.scoreText.y = -Game.app.view.height / 28;
        this.scoreText.scale.set(4.5);
        this.displayScore();
    }

    changeBgColor() {
        this.mainColor = CommonUtils.randomColorBackground();
        this.scoreText.style.fill = this.mainColor.color;
        this.playGround.tint = this.mainColor.color;
        this.retangleTop.tint = this.mainColor.colorDarker;
        this.retangleBottom.tint = this.mainColor.colorDarker;
    }

    displayScore() {
        this.addChild(this.scoreText);
    }

    hideScore(){
        this.removeChild(this.scoreText);
    }
    update() {
        if(Data.currentScore < 10) this.scoreText.text = `0${Data.currentScore}`;
        else this.scoreText.text = `${Data.currentScore}`;

        if(Data.currentScore > 0 && Data.currentScore % 5 == 0) {
            if(!this.ok) this.changeBgColor();
            this.ok = 1;
        } else this.ok = 0;
    }
}