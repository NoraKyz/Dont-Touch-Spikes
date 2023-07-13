import { Container } from "pixi.js";
import { SkinsList } from "./skinsList";
import { SkinManager } from "../../../skin/skinManager";
import { SkinsShopUI } from "./skinsShopUI";

export class SkinsShop extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        this._initEventUI();
    }

    _initProperties() {

    }

    _initComponents() {
        this._initSkinManager();
        this._initSkinsList();
        this._initShopUI();
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

    }
}