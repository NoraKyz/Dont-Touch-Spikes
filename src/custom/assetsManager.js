import { Assets } from "pixi.js";

export class AssetsManager {
    static _loadAssets() {
        this.keys = [];
        
        // Ví dụ cách sử dụng
        // this._addBundle(
        //     "player_tank", {
        //     "Track_1_A": "./assets/images/Tank/PNG/Tracks/Track_1_A.png",
        //     "Track_1_B": "./assets/images/Tank/PNG/Tracks/Track_1_B.png",
        // })
        this._addBundle(
            "item", {
                "candy": "../assets/images/keo.png",
            }
        )
        this._addBundle(
            "bird", {
                "bird1": "./assets/images/Bird1.png",
                "bird2": "./assets/images/Bird2.png",
            }
        )

        return Assets.loadBundle(this.keys);
    }

    static _addBundle(key, bundle) {
        this.keys.push(key);
        Assets.addBundle(key, bundle);
    }
}