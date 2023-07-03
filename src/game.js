import { Application, Assets } from "pixi.js";
import { Scene } from "./scene/scene";
import { GameConstant } from "./gameConstant";
import { AssetsManager } from "./custom/assetsManager";
import { Data } from "./data";
import * as TWEEN from "@tweenjs/tween.js";

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
            this._initScene();
            this.app.ticker.add((dt) => Game.update(dt));
        });
    }

    static resize(width, height) {
        this.style = this.app.view.style;
        this.ratio = Math.max(GameConstant.GAME_WIDTH / width, GameConstant.GAME_HEIGHT / height);

        this.app.view.width = GameConstant.GAME_WIDTH / this.ratio;
        this.app.view.height = GameConstant.GAME_HEIGHT / this.ratio;

        let vMargin = Math.floor((width - this.app.view.width) / 2);
        let hMargin = Math.floor((height - this.app.view.height) / 2); 
        this.style.margin = `${hMargin}px ${vMargin}px ${hMargin}px ${vMargin}px`;

        this.app.resizeTo = this.app.view;
        this.app.resize();
        this.scene && this.scene.resize();
    }

    static _initScene() {
        this.scene = new Scene();
        this.app.stage.addChild(this.scene);
    }

    static update(dt) {
        this.scene.update(dt);
        TWEEN.update();
    }
}

window.onload = function () {
    Data.init();
    Game.init();
    window.onresize = () => {
        Game.resize(window.innerWidth, window.innerHeight);
    }
}

