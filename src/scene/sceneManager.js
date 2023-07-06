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
        this.scenes = []; // danh sách các scene
        this.enabledScene = null; // scene đang chạy
    }
    // Khởi tạo hết các scene trong game và push vô mảng scenes
    _initScenes() {
        this.mainScene = new MainScene();
        this.scenes.push(this.mainScene);
    }
    // gọi id trong scene để chạy scene đó
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
    // Reset scene rồi mới loại bỏ nó
    _onEndScene() {
        this.scenes.forEach(scene => {
            if (scene.id === this.enabledScene.id) {
                this.enabledScene._onResetScene();
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
