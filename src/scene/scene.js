import { Container } from "pixi.js";
import { Player } from "../obj/player/player";
import { Game } from "../game";
import { SpikesManager } from "../obj/trap/spikesManager";
import { Background } from "../obj/background/background";
import { MainUI } from "../obj/UI/mainUI";
import { UIManager } from "../obj/UI/UIManager";

export const GameState = Object.freeze({
    Ready: "ready",
    Playing: "playing",
    Win: "win",
    Lose: "lose"
});

export class Scene extends Container {
    constructor() {
        super();
        this._initGameplay();
        this._initInputHandle();
        this.gameState = GameState.Ready;
    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => this._onPointerDown());
    }

    _onPointerDown() {
        if (this.gameState == GameState.Ready) {
            this.player.onPointerDown();
        }
    }

    _initGameplay() {
        this.gameplay = new Container();
        this.gameplay.x = Game.app.screen.width / 2;
        this.gameplay.y = Game.app.screen.height / 2;
        this.addChild(this.gameplay);
        this._initBackground();
        this._initUI();
        this._initPlayer();
        //this._initTraps();     
    }

    _initUI(){
        this.UI = new UIManager();
        this.gameplay.addChild(this.UI);
    }

    resize() {
        this.gameplay.x = Game.app.screen.width / 2;
        this.gameplay.y = Game.app.screen.height / 2;
    }

    _initPlayer() {
        this.player = new Player();
        this.gameplay.addChild(this.player);
    }

    _initTraps() {
        this.traps = new SpikesManager();
        this.gameplay.addChild(this.traps);
    }

    _initBackground(){
        this.background = new Background();
        this.gameplay.addChild(this.background);
    }

    update(dt) {
        this.player.update(dt);
    }

    _onLose() {
        this.gameState = GameState.Lose;
    }
}
