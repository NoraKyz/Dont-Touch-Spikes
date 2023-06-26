import * as PIXI from "pixi.js";
import { Game} from "../../game";
import {createUBOElements, Sprite} from "pixi.js";

export class GameOverUI extends PIXI.Container {
    constructor() {
        super();
        this.gameOverBar = new PIXI.Container();
        this.bigTextStyle = new PIXI.TextStyle({
            fontFamily: "Arial Black",
            fontSize: 50,
            fontWeight: "bold",
            fill: ['#ffffff'],
        });

        this.pointsButtonBar = new PIXI.Container();
        this.pointsButton = new PIXI.Sprite(PIXI.Texture.from("assets/images/CGB02-red_L_btn.png"));
        this.pointsButton.anchor.set(0.5);
        this.pointsButton.zIndex = 1;
        this.pointsButtonBar.addChild(this.pointsButton);
        this.pointsButtonText = new PIXI.Text("Points", this.bigTextStyle);
        this.pointsButtonText.anchor.set(0.5);
        this.pointsButtonText.zIndex = 2;
        this.pointsButtonBar.cursor = "pointer";
        this.pointsButtonBar.on("pointerdown", () => {});
        this.pointsButtonBar.addChild(this.pointsButtonText);

        this.replayButtonBar = new PIXI.Container();
        this.replayButton = new PIXI.Sprite(PIXI.Texture.from("assets/images/CGB02-red_L_btn.png"));
        this.replayButton.anchor.set(0.5);
        this.replayButton.zIndex = 1;
        this.replayButtonBar.addChild(this.replayButton);
        this.replayButtonText = new PIXI.Text("REPLAY", this.bigTextStyle);
        this.replayButtonText.anchor.set(0.5);
        this.replayButtonText.zIndex = 2;
        this.replayButtonBar.cursor = "pointer";
        this.replayButtonBar.on("pointerdown", () => {});
        this.replayButtonBar.addChild(this.replayButtonText);

        this.shareButtonBar = new PIXI.Container();
        this.shareButton = new PIXI.Sprite(PIXI.Texture.from("assets/images/CGB02-red_L_btn.png"));
        this.shareButton.anchor.set(0.5);
        this.shareButton.zIndex = 1;
        this.shareButtonBar.addChild(this.shareButton);
        this.shareButtonText = new PIXI.Text("SHARE", this.bigTextStyle);
        this.shareButtonText.anchor.set(0.5);
        this.shareButtonText.zIndex = 2;
        this.shareButtonBar.cursor = "pointer";
        this.shareButtonBar.on("pointerdown", () => {});
        this.shareButtonBar.addChild(this.shareButtonText);

        this.gameOverBar.addChild(this.pointsButtonBar);
        this.gameOverBar.addChild(this.replayButtonBar);
        this.gameOverBar.addChild(this.shareButtonBar);
        this.gameOverBar.position.set(Game.app.screen.width / 2, Game.app.screen.height / 2);
        this.pointsButtonBar.position.set(0, -210);
        this.replayButtonBar.position.set(0, -70);
        this.shareButtonBar.position.set(0, 70);

        this.gameOverBar.sortChildren();
        this.gameOverBar.zIndex = 1;
        this.addChild(this.gameOverBar);
        this.zIndex = 100;
    }
}