import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";
import { Data } from "../../data";

export class GameInfor extends Container {
    constructor() {
        super();
        this._initTextStyle();
        this._initGameInfor();
        this._initItemQuantity();
        this.displayGameInfor();
    }
    _initTextStyle() {
        this.style = new TextStyle({
            fill: "#808080",
            fontFamily: "Blissful Thinking",
            fontSize: 60 / Game.ratio,
            fontWeight: "lighter",
            letterSpacing: 1 / Game.ratio,
        });
    }
    _initItemQuantity() {
        this.itemImage = Sprite.from(Assets.get("candy"));
        this.itemQuantity = new Text(` ${Data.itemQuantity}`, {
            ...this.style,
            fontSize: 80 / Game.ratio,
            fill: "#FF8207"
        });
        this.itemImage.anchor.set(0.5);
        this.itemImage.scale.set(1.5 / Game.ratio);
        this.itemQuantity.anchor.set(0.5);

        this.itemImage.position.set(-40 / Game.ratio, Game.app.view.height / 7 + 65 / Game.ratio);
        this.itemQuantity.position.set(40 / Game.ratio, Game.app.view.height / 7 + 65 / Game.ratio);

        this.addChild(this.itemImage);
        this.addChild(this.itemQuantity);
    }

    _initGameInfor() {

        this.gameInforTop = new Text(`BEST SCORE : ${Data.bestScore}`, this.style);
        this.gameInforTop.anchor.set(0.5);
        this.gameInforTop.position.set(0, Game.app.view.height / 7 + 140 / Game.ratio);

        this.gameInforBottom = new Text(`GAMES PLAYED : ${Data.gamesPlayed}`, this.style);
        this.gameInforBottom.anchor.set(0.5);
        this.gameInforBottom.position.set(0, Game.app.view.height / 7 + 195 / Game.ratio);

        this.addChild(this.gameInforTop);
        this.addChild(this.gameInforBottom);
    }

    _updateItemQuantity() {
        this.itemQuantity.text = `${Data.itemQuantity}`;
    }
    _updateBestScore() {
        if (Data.currentScore > Data.bestScore) Data.bestScore = Data.currentScore;
        this.gameInforTop.text = `BEST SCORE : ${Data.bestScore}`;
    }
    _updateGamePlayed() {
        this.gameInforBottom.text = `GAMES PLAYED : ${++Data.gamesPlayed}`;
    }
    updateGameInfor() {
        this._updateBestScore();
        this._updateGamePlayed();
        this._updateItemQuantity();
    }

    displayGameInfor() {
        this.visible = true;
    }
    hideGameInfor() {
        this.visible = false;
    }
}