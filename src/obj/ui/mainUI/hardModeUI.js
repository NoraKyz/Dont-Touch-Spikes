import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../../game";

export class HardModeUI extends Container {
    constructor() {
        super();
        this._initTextStyle();
        this._initGameTutol();
        this._initTitleUI();
        this._showMainUI();
    }

    _initTextStyle() {
        this.style = new TextStyle({
            fill: "#FF3464",
            fontFamily: "Blissful Thinking",
            fontSize: 55 / Game.ratio,
            fontWeight: "lighter",
            letterSpacing: 1 / Game.ratio,
        });
    }

    _initTitleUI() {
        const style = new TextStyle({
            ...this.style,
            fill: "#808080",
            fontSize: 92 / Game.ratio,
            fontWeight: 550,
        });

        this.gameName = new Text("  HARD\n MODE", style);
        this.gameName.anchor.set(0.5);
        this.gameName.position.set(-15 / Game.ratio, -400 / Game.ratio);
        this.addChild(this.gameName);
    }


    _initGameTutol() {
        this.gameTutorial = new Text("    TAP \nTO JUMP", this.style);
        this.gameTutorial.anchor.set(0.5);
        this.gameTutorial.position.set(0, - 165 / Game.ratio);
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