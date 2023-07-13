import { Container } from "pixi.js";
import { ClassicScene } from "./classicScene";
import { HardModeScene } from "./hardModeScene";

export class SceneManager extends Container {

    constructor() {
        super();
        this._initProperties();
        this._initScenes();
        this.onStartScene("ClassicModeScene");
    }

    _initProperties() {
        this.scenes = []; // Danh sách các scene
        this.enabledScene = null; // Scene đang chạy
    }
    // Khởi tạo hết các scene trong game và push vô mảng scenes
    _initScenes() {
        this.mainScene = new ClassicScene(this);
        this.scenes.push(this.mainScene);

        this.hardmodeScene = new HardModeScene(this);
        this.scenes.push(this.hardmodeScene);
    }
    // Gọi id trong scene để chạy scene đó
    onStartScene(id) {
        if(this.enabledScene !== null){
            this._onEndScene();
        }

        this.scenes.forEach(scene => {
            if (scene.id === id) {
                this.enabledScene = scene;
                this.enabledScene.onResetScene();
                this.addChild(scene);            
            }
        });
    }
    // Reset scene hiện tại rồi loại bỏ nó
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
