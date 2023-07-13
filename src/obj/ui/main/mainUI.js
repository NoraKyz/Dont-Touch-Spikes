import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../../game";

export class MainUI extends Container {
    constructor() {
        super();
        this._initComponent();
    }

    _initComponent(){
        this._initTextStyle();
        this._initGameTutol();
        this._initTitleUI();
    }

    _initTextStyle() {
        this.style = new TextStyle({
            fill: "#FF3464",
            fontFamily: "Blissful Thinking",
            fontSize: 55 ,
            fontWeight: "lighter",
            letterSpacing: 1 ,
        });
    }

    _initTitleUI() {
        this.titleStyle = new TextStyle({
            ...this.style,
            fill: "#808080",
            fontSize: 92 ,
            fontWeight: 550,
        });

        this.gameName = new Text();
        this.gameName.anchor.set(0.5);
        this.gameName.position.set(0, -400);
        this.addChild(this.gameName);
    }


    _initGameTutol() {
        this.gameTutorial = new Text("    TAP \nTO JUMP", this.style);
        this.gameTutorial.anchor.set(0.5);
        this.gameTutorial.position.set(0, - 165 );
        this.addChild(this.gameTutorial);
    }
    
    onReset() {
        this._showMainUI();
    }

    _showMainUI() {
        this.visible = true;
    }

    hideMainUI() {
        this.visible = false;
    }
}