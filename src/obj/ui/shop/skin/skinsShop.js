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
        this.zIndex = 5;
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
        this.skinsList.initSkins(this.skinManager.skinsList);
        this.addChild(this.skinsList);
    }

    _initEventUI() {
        this.shopUI.on("close", () => {
            this.emit("close");
        });
    }

    _initEffect() {
        this.effect = new SkinsShopEffect(this);
    }

    onStart() {
        this.visible = true;
        this.skinsList.resize();
        this.effect.onStart();
    }

    onClose() {
        this.effect.onClose();
    }

    onReset() {
        
    }
}