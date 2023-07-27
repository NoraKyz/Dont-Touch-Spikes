import { Slider } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";

export class SliderOption extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        //this._setPos();
    }

    _initProperties() {
        this.meshColor = '#a5e34d';
        this.fillColor = '#00b1dd';
        this.borderColor = '#FFFFFF';
        this.backgroundColor = '#fe6048';
        this.fontColor = '#FFFFFF';
        this.min = 0;
        this.max = 100;
        this.value = 50;
        this.width = 450;
        this.height = 35;
        this.radius = 25;
        this.fontSize = 20;
        this.border = 3;
        this.handleBorder = 3;
        this.showValue = true;
        this.showFill = true;
    }

    _setPos() {
        this.x = -this.width / 2;
        this.y = -this.height / 2;
    }

    _initComponents() {
        this._initBackground();
        this._initFill();
        this._initSlider();
        this._initSingleSlider();
    }

    _initBackground() {
        this.background = new Graphics()
            .beginFill(this.borderColor)
            .drawRoundedRect(0, 0, this.width, this.height, this.radius)
            .beginFill(this.backgroundColor)
            .drawRoundedRect(this.border, this.border, this.width - (this.border * 2), this.height - (this.border * 2), this.radius);
            
    }

    _initFill() {
        this.fill = new Graphics()
            .beginFill(this.borderColor)
            .drawRoundedRect(0, 0, this.width, this.height, this.radius)
            .beginFill(this.fillColor)
            .drawRoundedRect(this.border, this.border, this.width - (this.border * 2), this.height - (this.border * 2), this.radius);
    }

    _initSlider() {
        this.slider = new Graphics()
            .beginFill(this.borderColor)
            .drawCircle(0, 0, 20 + this.handleBorder)
            .beginFill(this.meshColor)
            .drawCircle(0, 0, 20)
            .endFill();
    }

    _initSingleSlider() {
        // this.singleSlider = new Slider({
        //     bg: this.background,
        //     fill: this.showFill ? this.fill : null,
        //     slider: this.slider,
        //     min: this.min,
        //     max: this.max,
        //     value: this.value,
        //     valueTextStyle: {
        //         fill: this.fillColor,
        //         fontSize: this.fontSize
        //     },
        //     showValue: this.showValue
        // });

        // this.singleSlider.value = this.value;

        // this.singleSlider.onChange.connect((value) => {
        //     console.log(`Slider changed to ${value}`);
        // });

        // this.addChild(this.singleSlider);
    }
}