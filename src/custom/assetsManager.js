import { sound } from "@pixi/sound";
import { Assets } from "pixi.js";

export class AssetsManager {
    static _loadAssets() {
        this.keys = []

        this._addBundle(
            "sound", {
                "flySound": "./assets/sound/bird.mp3",
                "eatSound": "./assets/sound/eating.mp3",
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
            }
        )
        
        // this._addBundle(
        //     "UI", {
        //         "trophy": "./assets/images/trophy-20.png",
        //         "leaderboard": "./assets/images/leaderboard_FILL1_wght400_GRADO_opsz48.png",
        //     }
        // )
        return Assets.loadBundle(this.keys);
    }

    static _addBundle(key, bundle) {
        this.keys.push(key);
        Assets.addBundle(key, bundle);
    }
}