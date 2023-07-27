import { EventEmitter } from "events";
import { ChallengesStorage } from "./challengesStorage";
import { ChallengeChecker } from "./challengeChecker";

export class ChallengesManager extends EventEmitter {
    static _instance;

    static get instance() {
        if (!this._instance) {
            this._instance = new ChallengesManager();
        }

        return this._instance;
    }

    constructor() {
        super();
        this.challengesList = [];
        this.completedChallenges = 0;
        this._initChallenges();
        this._initChecker();
        this.currentChallenge = this.challengesList[0];
        this._initEvent();
    }

    _initEvent() {
        this.checker.on("completeChallenge", () => {
            this.onCompleteChallenge();
        });
    }

    onCompleteChallenge() {
        this.completedChallenges++;
        this.currentChallenge = this.challengesList[this.currentChallenge.id];
    }

    _initChallenges() {
        ChallengesStorage.storage.forEach(challenge => {
            this.challengesList.push(challenge);
            if (challenge.completed) {
                this.completedChallenges++;
            }
        });
    }

    _initChecker() {
        this.checker = new ChallengeChecker();
    }

    update(sceneId) {     
        this.currentChallenge = this.checker.update(this.currentChallenge, sceneId);
        this.checker.checker(this.currentChallenge);

        return this.checker.completedChallenge;
    }
}