import { Container } from "pixi.js";
import { Player } from "../obj/player/player";
import { Game } from "../game";
import { Spike } from "../obj/trap/spike";
import { SpikesManager } from "../obj/trap/spikesManager";

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
        this._initPlayer();
        this._initTraps();
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

    update(dt) {
        this.player.update(dt);
    }

    _onLose() {
        this.gameState = GameState.Lose;
    }
}
