import { Container } from "pixi.js";
import { MainScene } from "./mainScene";

export class SceneManager extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initScenes();
    }
    _initProperties() {
        this.scenes = [];
    }

    _initScenes() {
        this.mainScene = new MainScene();
        this.addChild(this.mainScene);
    }

    resize() {
        this.mainScene.onResize();
    }

    update(dt) {
        this.mainScene.update(dt);
    }
}
