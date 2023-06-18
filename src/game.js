import { Application } from "pixi.js";
import { Scene } from "./scene/scene";
import { InputManager } from "./custom/inputManager";
import { GameConstant } from "./gameConstant";
import { AssetsManager } from "./custom/assetsManager";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);

        AssetsManager._loadAssets().then(() => {
            InputManager.init(this.app.view);
            this._initScene();
            this.app.ticker.add((dt) => Game.update(dt));
        })
    }

    static _initScene() {
        this.scene = new Scene();
        this.app.stage.addChild(this.scene);
    }

    static update(dt) {
        this.scene.update(dt);
    }
}

window.onload = function () {
    Game.init();
}
