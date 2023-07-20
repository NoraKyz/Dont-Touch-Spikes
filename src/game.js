import { Application } from "pixi.js";
import { SceneManager } from "./scene/sceneManager";
import { GameConstant } from "./gameConstant";
import { AssetsManager } from "./custom/assetsManager";
import { Data } from "./data";
import * as TWEEN from "@tweenjs/tween.js";
import { SkinStorage } from "./obj/skin/skinStorage";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0xe0ddd5,
            resolution: 1,
        });
        document.body.appendChild(this.app.view);


        AssetsManager._loadAssets().then(() => {
            SkinStorage.init();
            this._initScene();
            this.app.ticker.add((dt) => Game.update(dt));
        });

        Game.resize();
    }

    static resize() {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / GameConstant.GAME_WIDTH, screenHeight / GameConstant.GAME_HEIGHT);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * GameConstant.GAME_WIDTH);
        const enlargedHeight = Math.floor(scale * GameConstant.GAME_HEIGHT);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        this.app.view.style.width = `${enlargedWidth}px`;
        this.app.view.style.height = `${enlargedHeight}px`;
        this.app.view.style.marginLeft = this.app.view.style.marginRight = `${horizontalMargin}px`;
        this.app.view.style.marginTop = this.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    static _initScene() {
        this.sceneManager = new SceneManager();
        this.app.stage.addChild(this.sceneManager);
    }

    static update(dt) {
        this.sceneManager.update(dt);
        TWEEN.update();
    }
}

window.onload = function () {
    Data.init();
    Game.init();
    window.onresize = () => {
        Game.resize();
    }
    window.onunload = () => {
        Data.pushData();
    }
}

