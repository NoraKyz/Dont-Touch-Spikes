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
            backgroundColor: 0xe0ddd5,
            resolution: 1,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";
        this.resize(window.innerWidth, window.innerHeight);
        AssetsManager._loadAssets().then(() => {
            InputManager.init(this.app.view);
            this._initScene();
            this.app.ticker.add((dt) => Game.update(dt));
        });
    }

    static resize(width, height) {
        this.app.view.width = width;
        this.app.view.height = height;
        this.app.resizeTo = this.app.view;
        this.app.resize();
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
