import { EventEmitter } from "events";
import { Data } from "../../data";

export class ChallengeChecker extends EventEmitter {
  constructor(){
    super();
    this._initProperties();
  }

  _initProperties(){
    this.lastCandies = Data.itemQuantity;
    this.candies = 0;
    this.score = 0;
    this.completedChallenge = false;
  }
  _resetData(){
    this.lastCandies = Data.itemQuantity;
    this.candies = 0;
    this.score = 0;
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
        if(this.score > currentChallenge.progress) currentChallenge.progress = this.score;
        break;
      case "classicMode":
        if(sceneId === "ClassicModeScene"){
          this.score = Data.currentScore;
          if(this.score > currentChallenge.progress) currentChallenge.progress = this.score;
        }
        break;  
      case "hardMode":
        if(sceneId === "HardModeScene"){
          this.score = Data.currentScore;
          if(this.score > currentChallenge.progress) currentChallenge.progress = this.score;
        }
        break;
    } 
    return currentChallenge;
  }
  _updateGamePlayed(currentChallenge, sceneId){
    switch(currentChallenge.scene){
      case "any":
        currentChallenge.progress ++;
        break;
      case "classicMode":
        if(sceneId === "ClassicModeScene"){
          currentChallenge.progress ++;
        }
        break;  
      case "hardMode":
        if(sceneId === "HardModeScene"){
          currentChallenge.progress ++;
        }
        break;
    } 
    return currentChallenge;
  }

  checker(currentChallenge){
    if(currentChallenge.progress >= currentChallenge.goal) {
      this._complete();
      this.completedChallenge = true;
    } else this.completedChallenge = false;
  }

  _complete(){
    this.emit("completeChallenge");
  }
}