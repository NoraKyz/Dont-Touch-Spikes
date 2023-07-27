import { Container, Graphics } from "pixi.js";

export class SoundOptionUI extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
    }

    _initProperties() {
        this.visible = false;
    }

    _initComponents() {
        this._initBackground();
    }

    _initBackground() {
        this.background = new Graphics();
        this.background.beginFill(0x808080);
        this.background.drawRect(0, 0, 500, 500);
        this.background.endFill();
        this.addChild(this.background);
    }
}