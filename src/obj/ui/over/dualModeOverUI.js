import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { OverUI } from "./overUI";


export class DualModeOverUI extends OverUI {
    constructor() {
      super();
      this.elapsed = 0;
    }
    _initPointButton(){
      this.pointsButton = new Graphics();
      this.pointsButton.beginFill(808080); 
      this.pointsButton.drawRoundedRect(-256, -200, 256 * 2, 200, 20); 
      this.pointsButton.endFill();
      this.addChild(this.pointsButton);

      this._initBluePlayer();
      this._initRedPlayer();
      this._initStarLeft();
      this._initStarRight();
    }
    _initBluePlayer(){
      this.blueSprite1 = Sprite.from(Assets.get("bird1"));
      this.blueSprite1.anchor.set(0.5);
      this.blueSprite1.position.set(-150, -115);
      this.blueSprite1.scale.set(0.2);
      this.addChild(this.blueSprite1);
      this.blueSprite1.visible = false;

      this.blueSprite2 = Sprite.from(Assets.get("bird2"));
      this.blueSprite2.anchor.set(0.5);
      this.blueSprite2.position.set(-150, -115);
      this.blueSprite2.scale.set(0.2);
      this.addChild(this.blueSprite2);
    }
    _initRedPlayer(){
      this.redSprite1 = Sprite.from(Assets.get("bird1"));
      this.redSprite1.anchor.set(0.5);
      this.redSprite1.position.set(150, -115);
      this.redSprite1.scale.set(0.2);
      this.redSprite1.scale.x *= -1;
      this.addChild(this.redSprite1);

      this.redSprite2 = Sprite.from(Assets.get("bird3"));
      this.redSprite2.anchor.set(0.5);
      this.redSprite2.position.set(150, -115);
      this.redSprite2.scale.set(0.2);
      this.redSprite2.scale.x *= -1;
      this.addChild(this.redSprite2);
      this.redSprite2.visible = false;
    }
    _initStar(position){
      const star = new Container();
      this.loseStar = Sprite.from(Assets.get("star1"));
      this.loseStar.position.set(position.x, position.y);
      this.loseStar.anchor.set(0.5);
      this.winStar = Sprite.from(Assets.get("star2"));
      this.winStar.position.set(position.x, position.y);
      this.winStar.anchor.set(0.5);
      star.addChild(this.loseStar);
      star.addChild(this.winStar);
      this.loseStar.visible = false;
      return star;
    }
    _initStarLeft(){
      this.leftStar1 = this._initStar({x: -195, y: -40});
      this.leftStar2 = this._initStar({x: -150, y: -40});
      this.leftStar3 = this._initStar({x: -105, y: -40});
      this.addChild(this.leftStar1);
      this.addChild(this.leftStar2);
      this.addChild(this.leftStar3);
    }
    _initStarRight(){
      this.rightStar1 = this._initStar({x: 195, y: -40});
      this.rightStar2 = this._initStar({x: 150, y: -40});
      this.rightStar3 = this._initStar({x: 105, y: -40});
      this.addChild(this.rightStar1);
      this.addChild(this.rightStar2);
      this.addChild(this.rightStar3);
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