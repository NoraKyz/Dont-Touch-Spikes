import { SkinStorage } from "./skinStorage.js";
import { Skin } from "./skin.js";
import { Data } from "../../data.js"

export class SkinManager {
    constructor() {
        this.skins = [];

        this._initSkins();
    }

    static init() {
        this.currentSkin = new Skin(SkinStorage.Default);
    }

    _initSkins() {
        SkinStorage.forEach(data => {
            let skin = new Skin(data);
            this.skins.push(skin);
        });
    }

    onGetSkin(skin) {
        if(Data.get(skin.cost.type) >= skin.cost.value) {
            Data.add(skin.cost.type, -skin.cost.value);
            skin.enabled = true;
            this.currentSkin = true;
            console.log("Skin unlocked!");
        } else {
            console.log("Not enough " + skin.cost.type);
        }
    }

    onSetSkin(skin) {
        if(skin.enabled == true) {
            this.currentSkin = skin;
            console.log("Skin set!");
        }
    }
}