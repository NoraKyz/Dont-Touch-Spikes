import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { OverUI } from "./overUI";


export class DualModeOverUI extends OverUI {
    constructor() {
      super();
      console.log(this.stateStarLeft, this.stateStarRight);
      this.elapsed = 0;
    }
    _initPointButton(){
      this.pointsButton = new Graphics();
      this.pointsButton.beginFill('808080'); 
      this.pointsButton.drawRoundedRect(-256, -200, 256 * 2, 200, 20); 
      this.pointsButton.endFill();
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

      // 192018
      // fc741a

      this._initStarLeft();
      this._initStarRight();
      this._initBluePlayer();
      this._initRedPlayer();
    }
    _initBluePlayer(){
      this.blueSprite1 = Sprite.from(Assets.get("bird1"));
      this.blueSprite1.anchor.set(0.5);
      this.blueSprite1.position.set(-162, -115);
      this.blueSprite1.scale.set(0.2);
      this.addChild(this.blueSprite1);
      this.blueSprite1.visible = false;

      this.blueSprite2 = Sprite.from(Assets.get("bird2"));
      this.blueSprite2.anchor.set(0.5);
      this.blueSprite2.position.set(-162, -115);
      this.blueSprite2.scale.set(0.2);
      this.addChild(this.blueSprite2);
    }
    _initRedPlayer(){
      this.redSprite1 = Sprite.from(Assets.get("bird1"));
      this.redSprite1.anchor.set(0.5);
      this.redSprite1.position.set(162, -115);
      this.redSprite1.scale.set(0.2);
      this.redSprite1.scale.x *= -1;
      this.addChild(this.redSprite1);

      this.redSprite2 = Sprite.from(Assets.get("bird3"));
      this.redSprite2.anchor.set(0.5);
      this.redSprite2.position.set(162, -115);
      this.redSprite2.scale.set(0.2);
      this.redSprite2.scale.x *= -1;
      this.addChild(this.redSprite2);
      this.redSprite2.visible = false;
    }
    _initStar(position){
      const star = new Container();
      star.loseStar = Sprite.from(Assets.get("star1"));
      star.loseStar.position.set(position.x, position.y);
      star.loseStar.anchor.set(0.5);
      star.winStar = Sprite.from(Assets.get("star2"));
      star.winStar.position.set(position.x, position.y);
      star.winStar.anchor.set(0.5);
      star.addChild(star.loseStar);
      star.addChild(star.winStar);
      star.winStar.visible = false;
      return star;
    }
    _initStarLeft(){
      //console.log(this.stateStarLeft);
      this.leftStar1 = this._initStar({x: -207, y: -37});
      this.leftStar2 = this._initStar({x: -162, y: -37});
      this.leftStar3 = this._initStar({x: -116, y: -37});
      this.addChild(this.leftStar1);
      this.addChild(this.leftStar2);
      this.addChild(this.leftStar3);
      
    }
    _initStarRight(){
      this.rightStar1 = this._initStar({x: 207, y: -37});
      this.rightStar2 = this._initStar({x: 162, y: -37});
      this.rightStar3 = this._initStar({x: 116, y: -37});
      this.addChild(this.rightStar1);
      this.addChild(this.rightStar2);
      this.addChild(this.rightStar3);
    }

    onReset(stateStarTop, stateStarBottom){
      this.stateStarLeft = stateStarTop;
      this.stateStarRight = stateStarBottom;

      if(this.stateStarLeft[0]) this.leftStar1.winStar.visible = true;
      if(this.stateStarLeft[1]) this.leftStar2.winStar.visible = true;
      if(this.stateStarLeft[2]) this.leftStar3.winStar.visible = true;

      if(this.stateStarRight[2]) this.rightStar1.winStar.visible = true;
      if(this.stateStarRight[1]) this.rightStar2.winStar.visible = true;
      if(this.stateStarRight[0]) this.rightStar3.winStar.visible = true;
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
      this.gameName.text = "PLAYER1 WIN!";
      this.gameName.style = this.titleStyle;
      this.gameName.position.set(0, -300);
    }

    _clickedReplayButton() {
      Assets.get("replayButtonSound").play();
      this.emit("replay");
    }
    update(dt){
      this.elapsed += dt;
      if(this.elapsed >= 50){
        this.blueSprite1.visible = !this.blueSprite1.visible;
        this.blueSprite2.visible = !this.blueSprite2.visible;
        this.redSprite1.visible = !this.redSprite1.visible;
        this.redSprite2.visible = !this.redSprite2.visible;
        this.elapsed = 0;
      }
    }
}