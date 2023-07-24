import { Assets, Container, Sprite } from "pixi.js";
import { MainUI } from "./mainUI";

export class ChallengesUI extends MainUI {
    constructor() {
        super();
    }

    _initComponent() {
        super._initTextStyle();
        this._initTitleUI();
        this._initBackButton();
        this._initGameTutorial();
    }

    _initTitleUI() {
        super._initTitleUI();
        this.titleStyle.fill = "#1d2434";
        this.gameName.text = "CHALLENGES";
        this.gameName.position.set(60, -430);
        this.gameName.style = this.titleStyle;
    }

    _initBackButton() {
        this.backButton = Sprite.from(Assets.get("undo"));
        this.backButton.anchor.set(0.5);
        this.backButton.scale.set(0.18);
        this.backButton.position.set(-260, -430);

        this.backButton.cursor = "pointer";
        this.backButton.eventMode = 'static';
        this.backButton.on("pointertap", () => this._toClassicModeScene());

        this.addChild(this.backButton);
    }


    _initGameTutorial() {
        this.gameTutorial = new Container();

        this.tickIcon = Sprite.from(Assets.get("tick"));
        this.tickIcon.scale.set(0.35);
        this.gameTutorial.addChild(this.tickIcon);

        this.addChild(this.gameTutorial);
    }

    _toClassicModeScene() {
        this.emit("toClassicModeScene")
    }
}
