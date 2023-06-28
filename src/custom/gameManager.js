import { Data } from "../data";
import { EventEmitter } from "events";
import { SpikesManager } from "../obj/trap/spikesManager";

export class GameManager extends EventEmitter {
    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    constructor() {
        super();
    }

    updateLevel() {
        if (Data.currentScore === 1) {
            SpikesManager.minSpikes = 1;
            SpikesManager.maxSpikes = 2;
        } else if (Data.currentScore <= 4) {
            SpikesManager.minSpikes = 2;
            SpikesManager.maxSpikes = 3;
        } else if (Data.currentScore <= 10) {
            SpikesManager.minSpikes = 2;
            SpikesManager.maxSpikes = 4;
        } else if (Data.currentScore <= 20) {
            SpikesManager.minSpikes = 3;
            SpikesManager.maxSpikes = 5;
        } else if (Data.currentScore <= 80) {
            SpikesManager.minSpikes = 4;
            SpikesManager.maxSpikes = 6;
        } else {
            SpikesManager.minSpikes = 4;
            SpikesManager.maxSpikes = 7;
        }
    }
}