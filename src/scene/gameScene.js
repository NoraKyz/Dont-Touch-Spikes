import { Container } from "pixi.js";
import { Game } from "../game";
import { GameManager } from "../custom/gameManager";
import { SpikesManager } from "../obj/trap/spikesManager";
import { Player } from "../obj/player/player";
import { ColliderDetector } from "../obj/physics/colliderDetector";

export const GameState = Object.freeze({
    Ready: "ready",
    Playing: "playing",
    End: "end",
});

export class GameScene extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initGameplay();
        this._initInputHandle();
        this._initColliderDetector();
        this._initGameManager();
    }

    _initProperties() {
        this.gameState = GameState.Ready;
        this.x = Game.app.screen.width / 2;
        this.y = Game.app.screen.height / 2;
    }

    _initColliderDetector() {
        this.colliderDetector = ColliderDetector.instance;
        this.colliderDetector.on("collision", this._onCollision.bind(this));
    }

    // abstract
    _onCollision() { }

    _initGameManager() {
        this.gameManager = GameManager.instance;
        this._onAddEventGM();
    }

    // abstract
    _onAddEventGM() { }

    _reloadScene() {
        this.player.onReset();
        this.traps.onReset();
        this.background.onReset();
        this.sceneUI.onReset();

        setTimeout(() => {
            this.gameState = GameState.Ready;
        }, 100);
    }

    onResize() {
        this.x = Game.app.screen.width / 2;
        this.y = Game.app.screen.height / 2;
    }

    _initGameplay() {       
        this._initBackground();
        this._initPlayer();
        this._initTraps();
        this._initSceneUI();
    }

    _onNextLevel() {
        if (this.gameState == GameState.End) {
            return;
        }
    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => {
            this._onPointerDown();
        });
    }

    // abstract
    _onPointerDown() { }

    _initPlayer() {
        this.player = new Player(this);
        this.addChild(this.player);
    }

    _initTraps() {
        this.traps = new SpikesManager();
        this.addChild(this.traps);
    }

    // abstract
    _initBackground() { }

    // abstract
    _initSceneUI() { }

    // abstract
    update(dt) { }
}