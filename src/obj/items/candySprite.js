import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";

export class CandySprite extends Container {

    constructor() {
        super();
        this._initTextStyle();
        this._initSprite();
    }

    _initTextStyle() {
        this.style = new TextStyle({
            fill: "#FF8207",
            fontFamily: "Blissful Thinking",
            fontSize: 55 * Game.ratio,
            fontWeight: "lighter",
            letterSpacing: 1 * Game.ratio,
        });
    }

    _initSprite() {
        this._candySprite();
        this._addItemSprite();
    }

    _candySprite() {
        this.candy = Sprite.from(Assets.get("candy"));
        this.scale.set(1.2 / Game.ratio);
        this.candy.anchor.set(0.5);
        this.addChild(this.candy);
    }

    _addItemSprite() {
        this.numberAddItem = new Text("+1", this.style);
        this.numberAddItem.scale.set(1 / Game.ratio);
        this.numberAddItem.anchor.set(0.5);
        this.addChild(this.numberAddItem);
    }

    onSpawn() {
        this.candy.visible = true;
        this.numberAddItem.visible = false;
    }

    onCollision() {
        this.candy.visible = false;
        this.numberAddItem.visible = true;
    }
}