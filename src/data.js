export class Data {
  static init(){
    this.currentScore = 0;
    this.bestScore = 0;
    this.gamesPlayed = 0;
    this.coin = 0;
  }
  setCurrentScore(){
    this.currentScore = 0;
  }
  setGamesPlayed(){
    this.gamesPlayed += 1;
  }
  setBestScore(){
    if(this.currentScore > this.bestScore) this.bestScore = this.currentScore;
  }
}