import { EventEmitter } from "events";
import { Data } from "../../data";

export class ChallengeChecker extends EventEmitter {
  constructor(){
    super();
    this._initProperties();
  }

  _initProperties(){
    this.lastCandies = Data.itemQuantity;
    this.currentScore = 0;
    this.gamePlayed = 0;
  }
  update(currentChallenge, sceneId){
    switch(currentChallenge.type){
      case "candy": 
        switch(currentChallenge.scene){
          case "any":
            break;
          case "classicMode":
            break;  
          case "hardMode":
            break;
        }
        currentChallenge.progress = Data.itemQuantity - this.lastCandies;
        break;
      case "score":
        switch(currentChallenge.scene){
          case "any":
            break;
          case "classicMode":
            break;  
          case "hardMode":
            break;
        } 
        this.currentScore = Data.currentScore;
        break;
      case "gamesPlayed":
        switch(currentChallenge.scene){
          case "any":
            break;
          case "classicMode":
            break;  
          case "hardMode":
            break;
        }
        break;
    }
  }
  checker(currentChallenge){
    switch(currentChallenge.type){
      case "candy": 
        break;
      case "score": 
        break;
      case "gamesPlayed":
        break;
    }
  }
  complete(){

  }
}