import { sound } from "@pixi/sound";
import { Assets } from "pixi.js";

export class AssetsManager {
    static _loadAssets() {
        this.keys = []

        this._addBundle(
            "sound", {
                "flyingSound": "./assets/sound/flyingSound.mp3",
                "eatingSound": "./assets/sound/eatingSound.mp3",
        })

        this._addBundle(
            "item", {
                "candy": "./assets/images/candy.png",
                "circle": "./assets/images/HardCircle.png",
            }
        )
        
        this._addBundle(
            "bird", {
                "bird1": "./assets/images/Bird1.png",
                "bird2": "./assets/images/Bird2.png",
                "birdDead": "./assets/images/birdDead.png",
            }
        )
        
        this._addBundle(
            "UI", {
                "pointsUI": "./assets/images/points.png",
                "replayButton": "./assets/images/replayButton.png",
                "shareButton": "./assets/images/shareButton.png",
            }
        )

        this._addBundle(
            "Trap",{
                "spike": "./assets/images/spike.png",
            }
        )

        return Assets.loadBundle(this.keys);
    }

    static _addBundle(key, bundle) {
        this.keys.push(key);
        Assets.addBundle(key, bundle);
    }
}