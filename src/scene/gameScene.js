import { Container } from "pixi.js";
import { Game } from "../game";
import { GameManager } from "../custom/gameManager";
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
        this.enabled = false;
        this.x = Game.app.screen.width / 2;
        this.y = Game.app.screen.height / 2;
    }

    _initColliderDetector() {
        this.colliderDetector = ColliderDetector.instance;
        this.colliderDetector.on("collision", this._onCollision.bind(this));
    }

    _initGameManager() {
        this.gameManager = GameManager.instance;
        this._onAddEventGM();
    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => {
            this._onPointerDown();
        });
    }

    // abstract
    _initGameplay() { }

    // abstract
    _onCollision() { }

    // abstract
    _onAddEventGM() { }

    // abstract
    _onPointerDown() { }

    // abstract
    _onResetScene() { }

    onResize() {
        this.x = Game.app.screen.width / 2;
        this.y = Game.app.screen.height / 2;
    }

    // abstract
    update(dt) { }
}