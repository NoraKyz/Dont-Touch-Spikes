export class Data {
  static init() {
    this.currentScore = 0;
    this.bestScore = 0;
    this.gamesPlayed = 0;
    this.coin = 0;
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