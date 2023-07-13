import { sound } from "@pixi/sound";
import { Assets } from "pixi.js";

export class AssetsManager {
    static _loadAssets() {
        this.keys = []

        this._addBundle(
            "sound", {
                "flyingSound": "./assets/sound/flyingSound.mp3",
                "eatingSound": "./assets/sound/eatingSound.mp3",
                "replayButtonSound": "./assets/sound/replay.mp3",
                "touchWallSound": "./assets/sound/touchWall.mp3",
                "loseSound": "./assets/sound/gameOver.mp3",
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
                "bird3": "./assets/images/Bird3.png",
                "birdDead": "./assets/images/birdDead.png",
            }
        )
        
        this._addBundle(
            "UI", {
                "pointsUI": "./assets/images/points.png",
                "replayButton": "./assets/images/replayButton.png",
                "shareButton": "./assets/images/shareButton.png",
                "undoButton": "./assets/images/Undo.png",
                "hardModeButton": "./assets/images/HardMode.png",
                "dualModeButton": "./assets/images/DualMode.png",
                "line": "./assets/images/line.png",
                "star1": "./assets/images/star1.png",
                "star2": "./assets/images/star2.png",
                "skinShopButton": "./assets/images/skinShopButton.png",
            }
        )

        this._addBundle(
            "trap",{
                "spike": "./assets/images/spike.png",
            }
        )

        this._addBundle(
            "font", {
                "Blissful Thinking": "./assets/fonts/Blissful Thinking.otf",
                "5Identification Mono": "./assets/fonts/5Identification-Mono.otf"
            }
        )

        return Assets.loadBundle(this.keys);
    }

    static _addBundle(key, bundle) {
        this.keys.push(key);
        Assets.addBundle(key, bundle);
    }
}