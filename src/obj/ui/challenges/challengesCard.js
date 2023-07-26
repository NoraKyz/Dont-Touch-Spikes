import {
  Graphics,
  Container,
  Sprite,
  Assets,
  Texture,
  Text,
  TextStyle,
} from "pixi.js";

export class ChallengeCard extends Container {
  constructor(challenge) {
    super();
    this._initProperties(challenge);
    this._initComponent();
  }

  _initProperties(challenge) {
    this.challenge = challenge;
  }

  _initComponent() {
    this._initSprite();
  }

  _initSprite() {
    this._initBackground();
    this._initText();
  }

  _initBackground() {
    this.challengeBg = new Container();
    this.challengeBg.position.set(0, 55);

    this.challengeMissionBg = Sprite.from(Assets.get("challengeMission"));
    this.challengeMissionBg.anchor.set(0.5);
    this.challengeMissionBg.position.set(0, 150);
    this.challengeMissionBg.scale.set(0.752);
    this.challengeBg.addChild(this.challengeMissionBg);

    this.challengeAchievedBg = new Graphics();
    this.challengeAchievedBg.beginFill(0x5bab16);
    this.challengeAchievedBg.position.set(-200, 187);
    this.challengeAchievedPercentage = this.challenge.progress / this.challenge.goal * 100;
    this.challengeAchievedBg.drawRoundedRect(
      0,
      0,
      (400 * this.challengeAchievedPercentage) / 100,
      72,
      12
    );
    this.challengeBg.addChild(this.challengeAchievedBg);

    this.addChild(this.challengeBg);
  }

  _initText() {
    this._initTextStyle();
    this._initTitle();
  }

  _initTextStyle() {
    this.nameStyle = new TextStyle({
      fill: "#FFFFFF",
      fontFamily: "Blissful Thinking",
      fontSize: 55,
      fontWeight: "lighter",
      letterSpacing: 1,
    });

    this.MissionStyle = new TextStyle({
      fill: "#1d2434",
      fontFamily: "Blissful Thinking",
      fontSize: 38,
    });
  }

  _initTitle() {
    this.challengeName = new Text("CHALLENGE " + this.challenge.id, this.nameStyle);
    this.challengeName.anchor.set(0.5);
    this.challengeName.position.set(0, 60);
    this.challengeBg.addChild(this.challengeName);

    this.challengeMissionTitle = new Text();
    this.challengeMissionTitle.text = this.challenge.descriptsion;
    this.challengeMissionTitle.style = this.MissionStyle;
    this.challengeMissionTitle.anchor.set(0.5);
    this.challengeMissionTitle.position.set(0, 140);
    this.challengeBg.addChild(this.challengeMissionTitle);

    this.challengeAchievedTitle = new Text();
    this.challengeAchievedTitle.text = this.challenge.progress.toString();
    this.challengeAchievedTitle.style = this.nameStyle;
    this.challengeAchievedTitle.anchor.set(0.5);
    this.challengeAchievedTitle.position.set(0, 225);
    this.challengeBg.addChild(this.challengeAchievedTitle);
  }

  update(challenge) {
    this.challenge = challenge;

    this.challengeAchievedBg.beginFill(0x5bab16);
    this.challengeAchievedBg.position.set(-200, 187);
    this.challengeAchievedPercentage = this.challenge.progress / this.challenge.goal * 100;
    this.challengeAchievedBg.drawRoundedRect(
      0,
      0,
      (400 * this.challengeAchievedPercentage) / 100,
      72,
      12
    );

    this.challengeName.text = "CHALLENGE " + this.challenge.id;
    this.challengeMissionTitle.text = this.challenge.descriptsion;
    this.challengeAchievedTitle.text = this.challenge.progress.toString();
  }
}
