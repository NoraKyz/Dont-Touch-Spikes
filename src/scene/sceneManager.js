import { Container } from "pixi.js";
import { HardModeScene } from "./hardModeScene";

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
        this.mainScene = new HardModeScene();
        this.addChild(this.mainScene);
    }

    resize() {
        this.mainScene.onResize();
    }

    update(dt) {
        this.mainScene.update(dt);
    }
}
