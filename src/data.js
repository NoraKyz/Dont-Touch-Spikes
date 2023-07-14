export class Data {
    static init() {
        this.currentScore = 0;
        this.bestScore = 0;
        this.gamesPlayed = 0;
        this.itemQuantity = 100;
    }

    static resetScore() {
        this.currentScore = 0;
    }
}