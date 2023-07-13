import { Container } from "pixi.js";
import { SkinsList } from "./skinsList";
import { SkinManager } from "../../../skin/skinManager";
import { SkinsShopUI } from "./skinsShopUI";
import { GameConstant } from "../../../../gameConstant";
import { SkinsShopEffect } from "./skinsShopEffect";

export class SkinsShop extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        this._initEventUI();
    }

    _initProperties() {
        this.visible = false;
        this.y = GameConstant.GAME_HEIGHT * 0.7;
    }

    _initComponents() {
        this._initSkinManager();
        this._initSkinsList();
        this._initShopUI();
        this._initEffect();
    }

    _initSkinManager() {
        this.skinManager = new SkinManager();
    }

    _initShopUI() {
        this.shopUI = new SkinsShopUI();
        this.addChild(this.shopUI);
    }

    _initSkinsList() {
        this.skinsList = new SkinsList();
        this.skinsList.initSkinCards(this.skinManager);
        this.addChild(this.skinsList);
    }

    _initEventUI() {
        this.shopUI.on("close", () => {
            this.emit("close");
        });

        this.skinManager
            .on("setSkin", () => {
                this.emit("close");
            })
            .on("dataChanged", () => this.update());
    }

    _initEffect() {
        this.effect = new SkinsShopEffect(this);
    }

    onStart() {
        this.visible = true;
        this.skinsList.scrollTop();
        this.effect.onStart();
        this.update();
    }

    onClose() {
        this.effect.onClose();
    }

    update() {
        this.shopUI.updateData();
    }
}