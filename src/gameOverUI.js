import * as PIXI from "pixi.js";
import { Game} from "./game";

export class GameOverUI extends PIXI.Container {
    constructor() {
        super();
        this.gameOverBar = new PIXI.Container();
        this.points = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fontWeight: "bold",
            fill: ['#ffffff'],
        });
        this.replayButton = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fontWeight: "bold",
            fill: ['#ffffff'],
        });
        this.shareButton = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 50,
            fontWeight: "bold",
            fill: ['#ffffff'],
        });

        this.points = new PIXI.Text("Points: ", this.points);

        this.replayButton = new PIXI.Text("Replay", this.replayButton);
        this.shareButton = new PIXI.Text("Share", this.shareButton);
    }
}