import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
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
        this._completeChallenges();
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
        this.gameTutorial.position.set(-220, -200);

        this.tickIcon = Sprite.from(Assets.get("tickImage"));
        this.tickIcon.anchor.set(0.5);
        this.tickIcon.scale.set(0.32);
        this.gameTutorial.addChild(this.tickIcon);
        
        this.tutorialStyle = new TextStyle({
            ...this.titleStyle,
            fontSize: 45,
            fontWeight: "normal",
        });

        this.tutorialText = new Text("Complete challenges \nto assert yourself", this.tutorialStyle);
        this.tutorialText.anchor.set(0.5);
        this.tutorialText.position.set(320, 0);
        this.gameTutorial.addChild(this.tutorialText);

        this.addChild(this.gameTutorial);
    }

    _completeChallenges() {
        this.completeChallenges = new Container();
        this.completeChallenges.position.set(-325, -100);

        this.completeChallenges.background = new Graphics();
        this.completeChallenges.background.beginFill(0x5ea919);
        this.completeChallenges.background.drawRoundedRect(0, 0, 650, 150, 30);
        this.completeChallenges.background.endFill();
        this.completeChallenges.addChild(this.completeChallenges.background);

        this.completeChallengesTextStyle = new TextStyle({
            ...this.titleStyle,
            fontSize: 50,
            fontWeight: "lighter",
            fill: "#faffff"
        });

        this.completeChallenges.text = new Text("COMPLETE CHALLAENGES", this.completeChallengesTextStyle);
        this.completeChallenges.text.anchor.set(0.5);
        this.completeChallenges.text.position.set(325, 40);
        this.completeChallenges.addChild(this.completeChallenges.text);

        this.completeChallenges.number = new Text("000/120", this.completeChallengesTextStyle); // TODO: add data
        this.completeChallenges.number.scale.set(1.2);
        this.completeChallenges.number.anchor.set(0.5);
        this.completeChallenges.number.position.set(325, 100);
        this.completeChallenges.addChild(this.completeChallenges.number);

        this.addChild(this.completeChallenges);
    }

    _toClassicModeScene() {
        this.emit("toClassicModeScene")
    }
}
