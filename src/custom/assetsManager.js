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
            "candy": "./assets/images/item/money/candy.png",
            "circle": "./assets/images/other/circle.png",
            "spike": "./assets/images/item/spikes/spike.png",
        })

        this._addBundle(
            "skin", {
            "birdBlue1": "./assets/images/skin/birdBlue/birdBlue1.png",
            "birdBlue2": "./assets/images/skin/birdBlue/birdBlue2.png",
            "birdBlue3": "./assets/images/skin/birdBlue/birdBlue3.png",

            "birdDefault1": "./assets/images/skin/birdDefault/birdDefault1.png",
            "birdDefault2": "./assets/images/skin/birdDefault/birdDefault2.png",
            "birdDefault3": "./assets/images/skin/birdDefault/birdDefault3.png",

            "birdNinja1": "./assets/images/skin/birdNinja/birdNinja1.png",
            "birdNinja2": "./assets/images/skin/birdNinja/birdNinja2.png",
            "birdNinja3": "./assets/images/skin/birdNinja/birdNinja3.png",

            "birdDarkBlue1": "./assets/images/skin/birdDarkBlue/birdDarkBlue1.png",
            "birdDarkBlue2": "./assets/images/skin/birdDarkBlue/birdDarkBlue2.png",
            "birdDarkBlue3": "./assets/images/skin/birdDarkBlue/birdDarkBlue3.png",

            "birdYellow1": "./assets/images/skin/birdYellow/birdYellow1.png",
            "birdYellow2": "./assets/images/skin/birdYellow/birdYellow2.png",
            "birdYellow3": "./assets/images/skin/birdYellow/birdYellow3.png",

            "birdBrown1": "./assets/images/skin/birdBrown/birdBrown1.png",
            "birdBrown2": "./assets/images/skin/birdBrown/birdBrown2.png",
            "birdBrown3": "./assets/images/skin/birdBrown/birdBrown3.png",
            
            "birdDead": "./assets/images/skin/birdDead.png"
        })

        this._addBundle(
            "button", {
            "cave": "./assets/images/ui/button/cave.png",
            "dualMode": "./assets/images/ui/button/dualMode.png",
            "hardMode": "./assets/images/ui/button/hardMode.png",
            "highScore": "./assets/images/ui/button/highScore.png",
            "points": "./assets/images/ui/button/points.png",
            "replay": "./assets/images/ui/button/replay.png",
            "share": "./assets/images/ui/button/share.png",
            "skinShop": "./assets/images/ui/button/skinShop.png",
            "tick": "./assets/images/ui/button/tick.png",
            "tree": "./assets/images/ui/button/tree.png",
            "undo": "./assets/images/ui/button/undo.png",
            "dualGameOver": "./assets/images/ui/button/dualGameOver.png"
        })

        this._addBundle(
            "font", {
            "Blissful Thinking": "./assets/fonts/Blissful Thinking.otf",
            "5Identification Mono": "./assets/fonts/5Identification-Mono.otf"
        })

        this._addBundle(
            "dual", {
            "line": "./assets/images/ui/dual/line.png",
            "star1": "./assets/images/ui/dual/star1.png",
            "star2": "./assets/images/ui/dual/star2.png"
        });

        this._addBundle(
            "challenges", {
            "tickImage": "./assets/images/ui/challenges/tickImage.png",
            "tickComplete": "./assets/images/ui/challenges/tickComplete.png",
            "challengeMission": "./assets/images/ui/challenges/challengeMission.png",
            "challengeBackground": "./assets/images/ui/challenges/ChallengeBg.png",
        });

        return Assets.loadBundle(this.keys);
    }

    static _addBundle(key, bundle) {
        this.keys.push(key);
        Assets.addBundle(key, bundle);
    }
}