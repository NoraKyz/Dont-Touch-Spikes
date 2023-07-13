import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";
import { Data } from "../../data";

export class GameInfor extends Container {
    constructor() {
        super();
        this._initTextStyle();
        this._initGameInfor();
        this._initItemQuantity();
        this.display();
    }
    _initTextStyle() {
        this.style = new TextStyle({
            fill: "#808080",
            fontFamily: "Blissful Thinking",
            fontSize: 60 ,
            fontWeight: "lighter",
            letterSpacing: 1 ,
        });
    }
    _initItemQuantity() {
        this.itemImage = Sprite.from(Assets.get("candy"));
        this.itemQuantity = new Text(` ${Data.itemQuantity}`, {
            ...this.style,
            fontSize: 80 ,
            fill: "#FF8207"
        });
        this.itemImage.anchor.set(0.5);
        this.itemImage.scale.set(1.5 );
        this.itemQuantity.anchor.set(0.5);

        this.itemImage.position.set(-40 , Game.app.view.height / 7 + 65 );
        this.itemQuantity.position.set(this.itemQuantity.width * 0.3 + this.itemImage.width * 0.5 , Game.app.view.height / 7 + 65 );

        this.addChild(this.itemImage);
        this.addChild(this.itemQuantity);
    }

    _initGameInfor() {

        this.gameInforTop = new Text(`BEST SCORE : ${Data.bestScore}`, this.style);
        this.gameInforTop.anchor.set(0.5);
        this.gameInforTop.position.set(0, Game.app.view.height / 7 + 140 );

        this.gameInforBottom = new Text(`GAMES PLAYED : ${Data.gamesPlayed}`, this.style);
        this.gameInforBottom.anchor.set(0.5);
        this.gameInforBottom.position.set(0, Game.app.view.height / 7 + 195 );

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

    onReset() {
        this.display();
        this.gameInforTop.text = `BEST SCORE : ${Data.bestScore}`;
        this.gameInforBottom.text = `GAMES PLAYED : ${Data.gamesPlayed}`
        this.itemQuantity.text = `${Data.itemQuantity}`;
    }

    display() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}