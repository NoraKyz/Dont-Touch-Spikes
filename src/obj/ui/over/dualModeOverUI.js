import { Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { OverUI } from "./overUI";
import { Data } from "../../../data";

export class DualModeOverUI extends OverUI {
  constructor() {
    super();
    this.elapsed = 0;
  }

  _initPointButton() {
    this.pointsButton1 = Sprite.from(Assets.get("dualGameOver1"));
    this.pointsButton1.anchor.set(0.5);
    this.pointsButton1.scale.set(2);
    this.pointsButton1.position.y = -110;
    this.pointsButton1.zIndex = 1;

    this.pointsButton2 = Sprite.from(Assets.get("dualGameOver2"));
    this.pointsButton2.anchor.set(0.5);
    this.pointsButton2.scale.set(2);
    this.pointsButton2.position.y = -110;
    this.pointsButton1.zIndex = 1;

    this.leftBlock = new Container();
    this.leftBlock.position.set(-232, -180);
    this.leftBlock.zIndex = 2;

    this.rightBlock = new Container();
    this.rightBlock.position.set(94, -180);
    this.rightBlock.zIndex = 2;

    this.loseBlock = new Graphics();
    this.loseBlock.beginFill("192018");
    this.loseBlock.drawRoundedRect(0, 0, 140, 140, 20);
    this.loseBlock.endFill();

    this.winBlock = new Graphics();
    this.winBlock.beginFill("fc741a");
    this.winBlock.drawRoundedRect(0, 0, 140, 140, 20);
    this.winBlock.endFill();

    this.addChild(this.leftBlock);
    this.addChild(this.rightBlock);

    this.pointNumber = new Text(Data.currentScore, this.style);
    this.pointNumber.anchor.set(0.5);
    this.pointNumber.position.y = -150;

    this.bluePlayer = this._createPlayer(
      "birdBlue1",
      "birdBlue2",
      { x: -162, y: -115 },
      1
    );
    this.bluePlayer.zIndex = 3;
    this.redPlayer = this._createPlayer(
      "birdDefault1",
      "birdDefault3",
      { x: 162, y: -115 },
      -1
    );
    this.redPlayer.zIndex = 3;

    this._initStarLeft();
    this._initStarRight();
  }

  _createPlayer(typeA, typeB, position, direction) {
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

  _createStar(type, position) {
    const star = Sprite.from(Assets.get(type));
    star.position.set(position.x, position.y);
    star.anchor.set(0.5);
    star.scale.set(1);
    return star;
  }

  _generateStars(position) {
    const stars = new Container();
    stars.loseStar = this._createStar("star1", position);
    stars.winStar = this._createStar("star2", position);
    stars.addChild(stars.loseStar);
    stars.addChild(stars.winStar);
    stars.winStar.visible = false;
    this.addChild(stars);
    return stars;
  }

  _initStarLeft() {
    this.leftStar = new Container();

    this.leftStar1 = this._generateStars({ x: -207, y: -44 });
    this.leftStar2 = this._generateStars({ x: -162, y: -44 });
    this.leftStar3 = this._generateStars({ x: -116, y: -44 });

    this.leftStar.addChild(this.leftStar1);
    this.leftStar.addChild(this.leftStar2);
    this.leftStar.addChild(this.leftStar3);

    this.leftStar.zIndex = 4;
    this.addChild(this.leftStar);
  }

  _initStarRight() {
    this.rightStar = new Container();

    this.rightStar1 = this._generateStars({ x: 207, y: -44 });
    this.rightStar2 = this._generateStars({ x: 162, y: -44 });
    this.rightStar3 = this._generateStars({ x: 116, y: -44 });

    this.rightStar.addChild(this.rightStar1);
    this.rightStar.addChild(this.rightStar2);
    this.rightStar.addChild(this.rightStar3);

    this.rightStar.zIndex = 4;
    this.addChild(this.rightStar);
  }

  onResetStar(gameState) {
    this.stateStarLeft = gameState.player2;
    this.stateStarRight = gameState.player1;
    this.leftStar1.winStar.visible = this.stateStarLeft[0];
    this.leftStar2.winStar.visible = this.stateStarLeft[1];
    this.leftStar3.winStar.visible = this.stateStarLeft[2];
    this.rightStar1.winStar.visible = this.stateStarRight[2];
    this.rightStar2.winStar.visible = this.stateStarRight[1];
    this.rightStar3.winStar.visible = this.stateStarRight[0];
  }

  onAllReset() {
    const gameState = {
      player1: [false, false, false],
      player2: [false, false, false],
    };
    this.onResetStar(gameState);
  }

  _initReplayButton() {
    super._initReplayButton();
    this.replayButton.position.y = 56;
  }

  _initShareButton() {
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
    this.gameName.text = "PLAYER 1 WINS!";
    this.gameName.style = this.titleStyle;
    this.gameName.position.set(0, -300);
  }

  winTitle(winPlayer) {
    if (winPlayer == "player1") {
      this.gameName.text = "PLAYER 1 WINS!";
      this.addChild(this.pointsButton1);
      this.leftBlock.addChild(this.loseBlock);
      this.rightBlock.addChild(this.winBlock);
      this.sortChildren();
    } else if (winPlayer == "player2") {
      this.addChild(this.pointsButton2);
      this.leftBlock.addChild(this.winBlock);
      this.rightBlock.addChild(this.loseBlock);
      this.sortChildren();
      this.gameName.text = "PLAYER 2 WINS!";
    }
  }

  _clickedReplayButton() {
    Assets.get("replayButtonSound").play();
    this.emit("replay");
  }
  update(dt) {
    this.elapsed += dt;
    if (this.elapsed >= 50) {
      this.bluePlayer.sprite1.visible = !this.bluePlayer.sprite1.visible;
      this.bluePlayer.sprite2.visible = !this.bluePlayer.sprite2.visible;
      this.redPlayer.sprite1.visible = !this.redPlayer.sprite1.visible;
      this.redPlayer.sprite2.visible = !this.redPlayer.sprite2.visible;
      this.elapsed = 0;
    }
  }
}
