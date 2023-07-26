import { EventEmitter } from "events";
import { ChallengesStorage } from "./challengesStorage";

export class ChallengesManager extends EventEmitter {
    static _instance;

    static get instance() {
        if(!this._instance) {
            this._instance = new ChallengesManager();
        }

        return this._instance;
    }

    constructor() {
        super();
        challengesList = [];
        this._initChallenges();
        this.currentChallenge = this.challengesList[0];
    }

    _initChallenges() {
        ChallengesStorage.storage.forEach(challenge => {
            challengesList.push(challenge);
        });
    }

    
}