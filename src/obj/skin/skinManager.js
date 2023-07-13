import { SkinStorage } from "./skinStorage.js";
import { Skin } from "./skin.js";
import { Data } from "../../data.js"

export class SkinManager {
    constructor() {
        this.skinsList = [];

        this._initSkins();
    }

    static init() {
        this.currentSkin = new Skin(SkinStorage.storage[0]);
    }

    _initSkins() {
        SkinStorage.storage.forEach(skin => {
            this.skinsList.push(new Skin(skin));
        });
    }

    onGetSkin(skinCard) {
        let skinData = skinCard.skinData;
        if(Data.itemQuantity >= skinData.cost.value) {
            Data.itemQuantity -= skinData.cost.value;
            skinCard.onUnlocked();
            this.currentSkin = true;
        }
    }

    onSetSkin(skinCard) {
        if(skinCard.enabled == true) {
            this.currentSkin = skinCard;
        }
    }
}