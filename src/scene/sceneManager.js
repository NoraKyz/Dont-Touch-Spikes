import { Container } from "pixi.js";
import { MainScene } from "./mainScene";

export class SceneManager extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initScenes();
        this.onStartScene("mainScene");
    }

    _initProperties() {
        this.scenes = [];
        this.enabledScene = null;
    }

    _initScenes() {
        this.mainScene = new MainScene();
        this.scenes.push(this.mainScene);
    }

    onStartScene(id) {
        if(this.enabledScene !== null){
            this._onEndScene();
        }

        this.scenes.forEach(scene => {
            if (scene.id === id) {
                this.enabledScene = scene;
                this.addChild(scene);            
            }
        });
    }

    _onEndScene() {
        this.scenes.forEach(scene => {
            if (scene.id === this.enabledScene.id) {
                this.removeChild(scene);            
            }
        });
    }

    onResize() {
        this.enabledScene.onResize();
    }

    update(dt) {
        this.enabledScene.update(dt);
    }
}
