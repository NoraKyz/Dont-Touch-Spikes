export class Data {
  static init() {
    this.currentScore = 0;
    this.bestScore = 3;
    this.gamesPlayed = 0;
    this.itemQuantity = 19;
  }

  static setCurrentScore() {
    this.currentScore = 0;
  }

  static setGamesPlayed() {
    this.gamesPlayed += 1;
  }

  static setBestScore() {
    if (this.currentScore > this.bestScore) this.bestScore = this.currentScore;
  }
}