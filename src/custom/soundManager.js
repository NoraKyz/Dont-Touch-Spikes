import { EventEmitter } from "events";
import { Assets } from "pixi.js";

export const TypeSound = Object.freeze({
    EFFECT: "effect",
    MUSIC: "music"
});

export class SoundManager extends EventEmitter {

    static _instance;

    static get instance() {
        if(!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    }

    constructor() {
        super();
        this.soundEffect = 100;
        this.soundMusic = 100;
    }

    playSound(soundName, type = TypeSound.EFFECT) {
        let sound = Assets.get(soundName);

        if(type === TypeSound.EFFECT) {
            sound.volume = this.soundEffect / 100;
        } else {
            sound.volume = this.soundMusic / 100;
        }

        sound.play();
    }

    setSoundEffect(value) {
        this.soundEffect = value;
    }

    setSoundMusic(value) {
        this.soundMusic = value;
    }
}