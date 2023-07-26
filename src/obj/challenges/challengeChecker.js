import { EventEmitter } from "events";
import { Data } from "../../data";

export class ChallengeChecker extends EventEmitter {
  constructor(){
    super();
    this._initProperties();
  }

  _initProperties(){
    this.lastCandies = Data.itemQuantity;
    this.lastGamePlayed = Data.gamesPlayed;
    this.candies = 0;
    this.score = 0;
    this.gamePlayed = 0;
  }
  update(currentChallenge, sceneId){
    switch(currentChallenge.type){
      case "candy": 
        currentChallenge = this._updateCandy(currentChallenge, sceneId);
        break;
      case "score":
        currentChallenge = this._updateScore(currentChallenge, sceneId);
        break;
      case "gamesPlayed":
        currentChallenge = this._updateGamePlayed(currentChallenge, sceneId);
        break;
    }
    this._checker(currentChallenge);
    return currentChallenge;
  }

  _updateCandy(currentChallenge, sceneId){
    switch(currentChallenge.scene){
      case "any":
        this.candies = Data.itemQuantity - this.lastCandies;
        currentChallenge.progress += this.candies;
        this.lastCandies = Data.itemQuantity;
        break;
      case "classicMode":
        if(sceneId === "ClassicModeScene"){
          this.candies = Data.itemQuantity - this.lastCandies;
          currentChallenge.progress += this.candies;
        } 
        this.lastCandies = Data.itemQuantity;
        break;  
      case "hardMode":
        if(sceneId === "HardModeScene"){
          this.candies = Data.itemQuantity - this.lastCandies;
          currentChallenge.progress += this.candies;
        }
        this.lastCandies = Data.itemQuantity;
        break;
    }
    return currentChallenge;
  }

  _updateScore(currentChallenge, sceneId){
    switch(currentChallenge.scene){
      case "any":
        this.score = Data.currentScore;
        currentChallenge.progress = this.score;
        break;
      case "classicMode":
        if(sceneId === "ClassicModeScene"){
          this.score = Data.currentScore;
          currentChallenge.progress = this.score;
        }
        break;  
      case "hardMode":
        if(sceneId === "HardModeScene"){
          this.score = Data.currentScore;
          currentChallenge.progress = this.score;
        }
        break;
    } 
    return currentChallenge;
  }
  _updateGamePlayed(currentChallenge, sceneId){
    switch(currentChallenge.scene){
      case "any":
        this.gamePlayed = Data.gamesPlayed - this.lastGamePlayed;
        currentChallenge.progress += this.candies;
        this.lastGamePlayed = Data.gamesPlayed;
        break;
      case "classicMode":
        if(sceneId === "ClassicModeScene"){
          this.gamePlayed = Data.gamesPlayed - this.lastGamePlayed;
          currentChallenge.progress += this.gamePlayed;
        }
        this.lastGamePlayed = Data.gamesPlayed;
        break;  
      case "hardMode":
        if(sceneId === "HardModeScene"){
          this.gamePlayed = Data.gamesPlayed - this.lastGamePlayed;
          currentChallenge.progress += this.gamePlayed;
        }
        this.lastGamePlayed = Data.gamesPlayed;
        break;
    } 
    return currentChallenge;
  }

  _checker(currentChallenge){
    if(currentChallenge.progress >= currentChallenge.goal) this._complete();
  }

  _complete(){
    this.emit("completeChallenge");
  }
}