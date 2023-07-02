import { Assets, Container, Sprite, Text } from "pixi.js";
import { Game } from "../../game";

export class CandySprite extends Container {

    constructor() {
        super();
        this._initSprite();
    }

    _initSprite() {
        this._candySprite();
        this._addItemSprite();
    }

    _candySprite() {
        this.candy = Sprite.from(Assets.get("candy"));
        this.scale.set(1.2 / Game.ratio);
        this.candy.anchor.set(0.5);
        this.candy.visible = false;
        this.addChild(this.candy);
    }

    _addItemSprite() {
        this.numberAddItem = new Text("+1", {
            fontFamily: 'Arial',
            fontWeight: 600,
            fontSize: 35 / Game.ratio,
            fill: '0xf50c0c',
        });
        this.numberAddItem.anchor.set(0.5);
        this.numberAddItem.visible = false;
        this.addChild(this.numberAddItem);
    }

    onNextLevel() {
        this.candy.visible = true;
        this.numberAddItem.visible = false;
    }

    onEaten() {
        this.candy.visible = false;
        this.numberAddItem.visible = true;
    }
}