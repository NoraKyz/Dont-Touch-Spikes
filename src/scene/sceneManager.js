import { Container } from "pixi.js";
import { ClassicScene } from "./classicScene";
import { HardModeScene } from "./hardModeScene";
import { DualModeScene } from "./dualModeScene";
import { ChallengesScene } from "./challengesScene";
import * as TWEEN from "@tweenjs/tween.js";

export class SceneManager extends Container {
  constructor() {
    super();
    this._initProperties();
    this._initScenes();
    this.onStartScene("ClassicModeScene");
    this._initEffect();
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

    this.dualmodeScene = new DualModeScene(this);
    this.scenes.push(this.dualmodeScene);

    this.challengesScene = new ChallengesScene(this);
    this.scenes.push(this.challengesScene);
  }

  _initEffect() {
    this.scenes.forEach((scene) => {
      scene.spawnEffect = new TWEEN.Tween(scene).to({ alpha: 1 }, 1000);
    });
  }

  // Gọi id trong scene để chạy scene đó
  onStartScene(id) {
    if (this.enabledScene !== null) {
      this._onEndScene();
      this.enabledSpawn = true;
    }
    this.scenes.forEach((scene) => {
      if (scene.id === id) {
        this.enabledScene = scene;
        this.onSpawnEffect(this.enabledScene);
        this.enabledScene.onResetScene();
        this.addChild(scene);
      }
    });
  }

  //Scene xuất hiện
  onSpawnEffect(scene) {
    if (this.enabledSpawn) {
      scene.alpha = 0;
      scene.spawnEffect.start();
      this.enabledSpawn = false;
    }
  }

  // Reset scene hiện tại rồi loại bỏ nó
  _onEndScene() {
    this.scenes.forEach((scene) => {
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
