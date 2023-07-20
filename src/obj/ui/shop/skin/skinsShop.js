import { Container, Graphics } from "pixi.js";
import { SkinsList } from "./skinsList";
import { SkinManager } from "../../../skin/skinManager";
import { SkinsShopUI } from "./skinsShopUI";
import { GameConstant } from "../../../../gameConstant";
import { SkinsShopEffect } from "./skinsShopEffect";
import { Game } from "../../../../game";

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
        this._initFakeRetangleBottom();
    }

    _initFakeRetangleBottom() {
        this.retangleBottom = new Graphics();
        this.retangleBottom.beginFill(0x808080);
        this.retangleBottom.drawRect(-Game.app.view.width / 2, Game.app.view.height * 2.5 / 7, Game.app.view.width, Game.app.view.height / 7);
        this.retangleBottom.endFill();
    }

    _initShopUI() {
        this.shopUI = new SkinsShopUI();
        this.addChild(this.shopUI);
    }

    _initSkinManager() {
        this.skinManager = SkinManager.instance;
    }

    _initSkinsList() {
        this.skinsList = new SkinsList();
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
        this.parent.addChild(this.retangleBottom);
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