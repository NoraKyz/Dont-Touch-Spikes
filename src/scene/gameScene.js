import { Container } from "pixi.js";
import { Game } from "../game";
import { ColliderDetector } from "../obj/physics/colliderDetector";
import { SceneManager } from "./sceneManager";

export const GameState = Object.freeze({
    Ready: "ready",
    Playing: "playing",
    End: "end",
});

export class GameScene extends Container {
    constructor(parent) {
        super();
        this.parent = parent;
        this._initProperties();
        this._initGameplay();
        this._initInputHandle();
        this._initColliderDetector();
        this._initSceneEvent();
    }
    // Khởi tạo các thuộc tính cơ bản của scene
    _initProperties() {
        this.gameState = GameState.Ready;
        this.x = Game.app.screen.width / 2;
        this.y = Game.app.screen.height / 2;
    }
    // Khởi tạo các thành phần cơ bản trong game scene, đăng kí các sự kiện tổng
    _initColliderDetector() {
        this.colliderDetector = ColliderDetector.instance;
        this.colliderDetector.on("collision", this._onCollision.bind(this));
    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => {
            this._onPointerDown();
        });
    }
    // Các hàm có comment abstract bắt buộc viết lại khi kế thừa

    // abstract
    _initGameplay() { } // Chứa các thành phàn obj trong scene đó

    // abstract
    _onCollision() { } // Xử lý va chạm

    // abstract
    _initSceneEvent() { } // Đăng kí các sự kiện cho scene

    // abstract
    _onPointerDown() { } // Xử lý sự kiện click chuột

    // abstract
    _onResetScene() { } // Reset lại scene

    onResize() {
        this.x = Game.app.screen.width / 2;
        this.y = Game.app.screen.height / 2;
    }

    // abstract
    update(dt) { } // Update các thành phần trong scene
}