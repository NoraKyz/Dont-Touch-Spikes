import { SkinStorage } from "./skinStorage.js";
import { Skin } from "./skin.js";
import { Data } from "../../data.js"
import { EventEmitter } from "events";

export class SkinManager extends EventEmitter {
    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new SkinManager();
        }

        return this._instance;
    }

    
    constructor() {
        super();
        this.skinsList = [];        
        this._initSkins();
        this.currentSkin = this.skinsList[0];
    }

    _initSkins() {
        SkinStorage.storage.forEach(objInStorage => {
            this.skinsList.push(new Skin(objInStorage));
        });
    }

    onGetSkin(skinCard) {
        if(Data.itemQuantity >= skinCard.data.cost.value) {
            Data.itemQuantity -= skinCard.data.cost.value;
            this._onUnlockSkin(skinCard);
            this.emit("dataChanged");
            skinCard.emit("unlockSkin");      
        }
    }

    _onUnlockSkin(skinCard) {
        SkinStorage.storage[skinCard.index].enabled = true;
        skinCard.data.enabled = true;
    }

    onSetSkin(skinCard) {
        if(skinCard.data.enabled == true) {
            this.currentSkin = skinCard.data;
            this.emit("setSkin");           
        }
    }
}