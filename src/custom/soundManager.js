import { Sound } from "@pixi/sound";

export class SoundManager {
    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    }

    constructor() {
        
    }

    play(name){
        this.sound.play(name);
    }
}