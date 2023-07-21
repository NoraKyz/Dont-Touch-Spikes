import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { OverUI } from "./overUI";
import { Data } from "../../../data";


export class DualModeOverUI extends OverUI {
    constructor() {
      super();
      this.elapsed = 0;
    }
    _initPointButton(){
      this.pointsButton = Sprite.from(Assets.get("dualGameOver"));
      this.pointsButton.anchor.set(0.5);
      this.pointsButton.scale.set(2);
      this.pointsButton.position.y = -110;
      this.addChild(this.pointsButton);

      this.leftBlock = new Graphics();
      this.leftBlock.beginFill('192018'); 
      this.leftBlock.drawRoundedRect(-232, -180, 140, 140, 20); 
      this.leftBlock.endFill();
      this.addChild(this.leftBlock);

      
      this.rightBlock = new Graphics();
      this.rightBlock.beginFill('fc741a'); 
      this.rightBlock.drawRoundedRect(94, -180, 140, 140, 20); 
      this.rightBlock.endFill();
      this.addChild(this.rightBlock);

      this.pointNumber = new Text(Data.currentScore, this.style);
      this.pointNumber.anchor.set(0.5);
      this.pointNumber.position.y = -150 ;

      this.bluePlayer = this._createPlayer("birdBlue1", "birdBlue2", {x: -162, y: -115}, 1);
      this.redPlayer = this._createPlayer("birdDefault1", "birdDefault3", {x: 162, y: -115}, -1);
      this._initStarLeft();
      this._initStarRight();
    }

    _createPlayer(typeA, typeB, position, direction){
      const player = new Container();
 
      player.sprite1 = Sprite.from(Assets.get(typeA));
      player.sprite1.anchor.set(0.5);
      player.sprite1.position.set(position.x, position.y);
      player.sprite1.scale.set(0.2);
      player.sprite1.visible = false;
      player.sprite1.scale.x *= direction;
 
      player.sprite2 = Sprite.from(Assets.get(typeB));
      player.sprite2.anchor.set(0.5);
      player.sprite2.position.set(position.x, position.y);
      player.sprite2.scale.set(0.2);
      player.sprite2.scale.x *= direction;
 
      player.addChild(player.sprite1);
      player.addChild(player.sprite2);
      this.addChild(player);
      return player;
    }

    _createStar(type, position){
      const star = Sprite.from(Assets.get(type));
      star.position.set(position.x, position.y);
      star.anchor.set(0.5);
      star.scale.set(1);
      return star;
    }

    _generateStars(position){
      const stars = new Container();
      stars.loseStar = this._createStar("star1", position);
      stars.winStar = this._createStar("star2", position);
      stars.addChild(stars.loseStar);
      stars.addChild(stars.winStar);
      stars.winStar.visible = false;
      this.addChild(stars);
      return stars;
    }
 
    _initStarLeft(){
      this.leftStar1 = this._generateStars({x: -207, y: -44});
      this.leftStar2 = this._generateStars({x: -162, y: -44}); 
      this.leftStar3 = this._generateStars({x: -116, y: -44});
    }
    _initStarRight(){
      this.rightStar1 = this._generateStars({x: 207, y: -44});
      this.rightStar2 = this._generateStars({x: 162, y: -44});
      this.rightStar3 = this._generateStars({x: 116, y: -44});
    }

    onResetStar(gameState){
      this.stateStarLeft = gameState.player2;
      this.stateStarRight = gameState.player1;
      this.leftStar1.winStar.visible = this.stateStarLeft[0];
      this.leftStar2.winStar.visible = this.stateStarLeft[1];
      this.leftStar3.winStar.visible = this.stateStarLeft[2];
      this.rightStar1.winStar.visible = this.stateStarRight[2];
      this.rightStar2.winStar.visible = this.stateStarRight[1];
      this.rightStar3.winStar.visible = this.stateStarRight[0];
    }

    onAllReset(){
      const gameState = {
        player1: [false, false, false],
        player2: [false, false, false],
      }
      this.onResetStar(gameState);
    }

    _initReplayButton(){
      super._initReplayButton();
      this.replayButton.position.y = 56;
    }

    _initShareButton(){
      super._initShareButton();
      this.shareButton.position.y = 150;
    }

    _initTitleUI() {
      super._initTitleUI();
      this.titleStyle = new TextStyle({
        ...this.style,
        fill: "#6C6381",
        fontSize: 70,
        fontWeight: 550,
      });
      this.gameName.text = "PLAYER 1 WIN!";
      this.gameName.style = this.titleStyle;
      this.gameName.position.set(0, -300);
    }

    winTitle(winPlayer){
      if(winPlayer == "player1") this.gameName.text = "PLAYER1 WIN!";
      else if(winPlayer == "player2") this.gameName.text = "PLAYER2 WIN!";
      else this.gameName.text = "DRAW !";
    }

    _clickedReplayButton() {
      Assets.get("replayButtonSound").play();
      this.emit("replay");
    }
    update(dt){
      this.elapsed += dt;
      if(this.elapsed >= 50){
        this.bluePlayer.sprite1.visible = !this.bluePlayer.sprite1.visible;
        this.bluePlayer.sprite2.visible = !this.bluePlayer.sprite2.visible;
        this.redPlayer.sprite1.visible = !this.redPlayer.sprite1.visible;
        this.redPlayer.sprite2.visible = !this.redPlayer.sprite2.visible;
        this.elapsed = 0;
      }
    }
}