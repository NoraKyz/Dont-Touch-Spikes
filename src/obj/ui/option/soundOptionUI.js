import { Slider } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";
import { SliderOption } from "./sliderOption";

// TODO: Chưa làm xong

export class SoundOptionUI extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        this._setPos();
    }

    _initProperties() {
        //this.visible = false;       
    }

    _setPos() {
        this.x = -this.width / 2;
        this.y = -this.height / 2;
    }

    _initComponents() {
        this._initBackground();
        this._initSoundEffectSlider();
    }

    _initBackground() {
        this.background = new Graphics();
        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(0, 0, 600, 300, 30);
        this.background.endFill();
        //this.addChild(this.background);
    }

    _initSoundEffectSlider() {
        this.soundEffectSlider = new SliderOption();
        this.addChild(this.soundEffectSlider);
    }
}