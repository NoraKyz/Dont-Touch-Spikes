import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";
import { Data } from "../../../../data";


export class SkinsShopUI extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
    }

    _initProperties() {
        this.position.set(-280, -400);
    }

    _initComponents() {
        this._initTextStyle();
        this._initBackButton();
        this._initTitle();
        this._initInfor();
    }

    _initTextStyle() {
        this.style = new TextStyle({
            fill: "#808080",
            fontFamily: "Blissful Thinking",
            fontSize: 100,
            fontWeight: "lighter",
            letterSpacing: 1,
        });
    }

    _initBackButton() {
        this.backButton = Sprite.from(Assets.get("undoButton"));
        this.backButton.anchor.set(0.5);
        this.backButton.scale.set(0.2);

        this.backButton.cursor = "pointer";
        this.backButton.eventMode = 'static';
        this.backButton.on("pointerdown", () => this._onClose());

        this.addChild(this.backButton);
    }

    _onClose() {
        this.emit("close")
    }

    _initTitle() {
        this.shopName = new Text("BIRDS", this.style);
        this.shopName.anchor.set(0.5);
        this.shopName.position.set(190, 0);
        this.addChild(this.shopName);
    }

    _initInfor() {
        this.shopInfor = new Container();
        this.shopInfor.position.set(380, 0);

        this.itemImage = Sprite.from(Assets.get("candy"));
        this.itemImage.anchor.set(0.5);
        this.itemImage.scale.set(1.5);
        this.shopInfor.addChild(this.itemImage);

        this.itemQuantity = new Text(` ${Data.itemQuantity}`, {
            ...this.style,
            fontSize: 80,
            fill: "#FF8207"
        });
        this.itemQuantity.anchor.set(0.5);
        this.itemQuantity.position.set(this.itemImage.width * 0.6 + this.itemQuantity.width * 0.4, 0);
        this.shopInfor.addChild(this.itemQuantity);

        this.addChild(this.shopInfor);
    }

    onStart() {

    }

    onClose() {
        
    }

    onReset() {
        this.itemQuantity.text = ` ${Data.itemQuantity}`;
    }
}