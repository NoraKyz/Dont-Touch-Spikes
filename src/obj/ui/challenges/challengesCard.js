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
    //TODO: Truyền challenge từ Data vào
    super();
    this._initProperties();
    this._initComponent();
  }

  _initProperties() {
    this.challenge = challenge;
  }

  _initComponent() {
    this._initSprite();
    this._initEvent();
  }

  _initSprite() {
    this._initBackground();
    this._initText();
  }

  _initBackground() {
    this.challengeBg = new Container();

    this.challengeMissionBg = Sprite.from(Assets.get("challengeMission"));
    this.challengeMissionBg.anchor.set(0.5);
    this.challengeMissionBg.position.set(0, 150);
    this.challengeMissionBg.scale.set(0.77);
    this.challengeBg.addChild(this.challengeMissionBg);

    this.challengeAchievedBg = new Graphics();
    this.challengeAchievedBg.beginFill(0x5bab16);
    this.challengeAchievedBg.position.set(-200, 188);
    this.challengeAchievedPercentage = 0; //TODO: Phần trăm hoàn thành, thêm Data
    this.challengeAchievedBg.drawRoundedRect(
      0,
      0,
      (400 * this.challengeAchievedPercentage) / 100,
      74,
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
    this.challengeName = new Text("CHALLENGE ", this.nameStyle); // TODO: Số thứ tự
    this.challengeName.anchor.set(0.5);
    this.challengeName.position.set(0, 60);
    this.addChild(this.challengeName);

    this.challengeMissionTitle = new Text();
    this.challengeMissionTitle.text = ""; //TODO: Nội dung nhiệm vụ, thêm Data
    this.challengeMissionTitle.style = this.MissionStyle;
    this.challengeMissionTitle.anchor.set(0.5);
    this.challengeMissionTitle.position.set(0, 140);
    this.addChild(this.challengeMissionTitle);

    this.challengeAchievedTitle = new Text();
    this.challengeAchievedTitle.text = ""; //TODO: Số lượng hoàn thành, thêm Data
    this.challengeAchievedTitle.style = this.nameStyle;
    this.challengeAchievedTitle.anchor.set(0.5);
    this.challengeAchievedTitle.position.set(0, 225);
    this.addChild(this.challengeAchievedTitle);
  }

  _initEvent() {
    //TODO: Thêm event
  }

  update() { }
}
