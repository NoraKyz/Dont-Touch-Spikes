import { ScrollBox } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../gameConstant";
import { SpikesManager } from "../obj/trap/spikesManager";
import { SkinCard } from "../obj/skin/skinCard";

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
        this._initSkinManager();
        this._initShop();
    }

    _initSkinManager() {
        this.skinManager = new SpikesManager();
    }

    _initShop() {
        this.shop = new ScrollBox({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT * 2 / 3,
            background: 0xFFFFFF,
            elementsMargin: 100,
            vertPadding: 55,
            horPadding: 106,
        });

        this.skinManager.skins.forEach(skin => {
             this.shop.addItem(new SkinCard(skin));
        });

        //this.shop.background.alpha = 0;

        this.addChild(this.shop);
    }

    onResetScene() {

    }

    onResize() {

    }

    update(dt) {

    }
}
