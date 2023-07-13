import { ScrollBox } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";

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
        // this.shop = new ScrollBox();

        // const content = new Graphics();
        // content.beginFill(0x808080);
        // content.drawRect(0, 0, 400, 400);
        // content.endFill();

        // this.shop.addItem(content);
        // this.addChild(this.shop);
    }

    onResetScene() {

    }

    onResize() {

    }

    update(dt) {

    }
}
