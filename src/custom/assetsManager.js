import { Assets } from "pixi.js";

export class AssetsManager {
    static _loadAssets() {
        this.keys = []
        return Assets.loadBundle(this.keys);
    }

    static _addBundle(key, bundle) {
        this.keys.push(key);
        Assets.addBundle(key, bundle);
    }
}