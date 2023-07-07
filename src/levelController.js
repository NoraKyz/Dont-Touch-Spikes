import { Data } from "./data";

export class LevelController {
    static updateLevel() {
        let minSpikes = 0, maxSpikes = 0;
        if (Data.currentScore === 1) {
            minSpikes = 1;
            maxSpikes = 2;
        } else if (Data.currentScore <= 2) {
            minSpikes = 2;
            maxSpikes = 3;
        } else if (Data.currentScore <= 5) {
            minSpikes = 3;
            maxSpikes = 4;
        } else if (Data.currentScore <= 10) {
            minSpikes = 3;
            maxSpikes = 5;
        } else if (Data.currentScore <= 30) {
            minSpikes = 4;
            maxSpikes = 6;
        } else {
            minSpikes = 6;
            maxSpikes = 6;
        }
        return {minSpikes: minSpikes, maxSpikes: maxSpikes};
    }
}