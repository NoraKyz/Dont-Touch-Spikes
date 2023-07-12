import { Container } from "pixi.js";
import { SkinManager } from "../obj/skin/skinManager";
import { Shop } from "../obj/ui/shop/shop";
import { ShopUI } from "../obj/ui/shop/shopUI";

export class ShopSkinScene extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        this._initSceneEvent();
    }

    _initProperties() {
        this.id = "ShopSkinScene";
    }

    _initComponents() {
        this._initSkinManager();
        this._initShop();
        this._initSceneUI();
    }

    _initSkinManager() {
        this.skinManager = new SkinManager();
    }

    _initShop() {
        this.shop = new Shop();
        this.shop.initSkins(this.skinManager.skinsList);
        this.shop.y += 240;
        this.addChild(this.shop);
    }

    _initSceneUI() {
        this.sceneUI = new ShopUI();
        this.sceneUI.position.set(80, 180);
        this.addChild(this.sceneUI);
    }

    _initSceneEvent() {
        this.sceneUI.on("toClassicModeScene", () => {
            this.parent.onStartScene("ClassicModeScene");
        })
    }

    onResetScene() {

    }

    onResize() {

    }

    update(dt) {

    }
}
