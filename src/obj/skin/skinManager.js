import { SkinStorage } from "./skinStorage.js";
import { Skin } from "./skin.js";
import { Data } from "../../data.js"
import { EventEmitter } from "events";

export class SkinManager extends EventEmitter {
    constructor() {
        super();
        this.skinsList = [];
        this._initSkins();
    }

    static init() {
        this.currentSkin = new Skin(SkinStorage.storage[0]);
    }

    _initSkins() {
        SkinStorage.storage.forEach(objInStorage => {
            this.skinsList.push(new Skin(objInStorage));
        });
    }

    onGetSkin(skinCard) {
        if(Data.itemQuantity >= skinCard.data.cost.value) {
            Data.itemQuantity -= skinCard.data.cost.value;
            this._onUnlockSkin(skinCard.data);
            this.emit("dataChanged");
            skinCard.emit("unlockSkin");      
        }
    }

    _onUnlockSkin(data) {
        data.enabled = true;
    }

    onSetSkin(skinCard) {
        if(skinCard.data.enabled == true) {
            SkinManager.setSkin(skinCard.data);  
            this.emit("setSkin");                      
        }
    }

    static setSkin(data) {
        this.currentSkin = data;
    }
}