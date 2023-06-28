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
        let minSpikes = 0, maxSpikes = 0;
        if (Data.currentScore === 1) {
            minSpikes = 1;
            maxSpikes = 2;
        } else if (Data.currentScore <= 4) {
            minSpikes = 2;
            maxSpikes = 3;
        } else if (Data.currentScore <= 10) {
            minSpikes = 2;
            maxSpikes = 4;
        } else if (Data.currentScore <= 20) {
            minSpikes = 3;
            maxSpikes = 5;
        } else if (Data.currentScore <= 80) {
            minSpikes = 4;
            maxSpikes = 6;
        } else {
            minSpikes = 4;
            maxSpikes = 7;
        }
        return {minSpikes: minSpikes, maxSpikes: maxSpikes};
    }
}