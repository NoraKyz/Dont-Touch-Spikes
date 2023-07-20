export class Data {
    static init() {
        this.currentScore = 0;
        this.bestScore = 0;
        this.gamesPlayed = 0;
        this.itemQuantity = 100;
        this.pullData();
    }

    static resetScore() {
        this.currentScore = 0;
    }

    static pushData(){
        this.data = {
            currentScore: this.currentScore,
            bestScore: this.bestScore,
            gamesPlayed: this.gamesPlayed,
            itemQuantity: this.itemQuantity,
        }
        localStorage.setItem("savedGameData", JSON.stringify(this.data));
    }
    static pullData(){
        const savedGameData = localStorage.getItem("savedGameData");
        if (savedGameData) {
            this.data = JSON.parse(savedGameData);
            this.currentScore = this.data.currentScore;
            this.bestScore = this.data.bestScore;
            this.gamesPlayed = this.data.gamesPlayed;
            this.itemQuantity = this.data.itemQuantity;
        }
    }
}