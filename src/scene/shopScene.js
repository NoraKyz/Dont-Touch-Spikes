import { ScrollBox } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../gameConstant";

export class ShopScene extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
    }

    _initProperties() {
        this.id = "ShopScene";
    }

    _initComponents() {
        this._initShop();
    }

    _initShop() {
        this.shop = new ScrollBox({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            background: 0xFFFFFF,
            elementsMargin: 100,
            vertPadding: 55,
            horPadding: 106,
            items: [
                new Graphics().beginFill(0x000000).drawRect(0, 0, 200, 200),
                new Graphics().beginFill(0x000000).drawRect(0, 0, 200, 200),
                new Graphics().beginFill(0x000000).drawRect(0, 0, 200, 200),
                new Graphics().beginFill(0x000000).drawRect(0, 0, 200, 200),
            ],
        });

        this.shop.background.alpha = 0;

        this.addChild(this.shop);
    }

    onResetScene() {

    }

    onResize() {

    }

    update(dt) {

    }
}
