import {
  Graphics,
  Container,
  Text,
  TextStyle,
  Sprite,
  Assets,
} from "pixi.js";
import * as TWEEN from '@tweenjs/tween.js'

export class NotifyChallenge extends Container {
  constructor(challenge) {
    super();
    this.challenge = challenge;
    this._initComponent();
  }

  _initComponent() {
    this._initBackground();
    this._initText();
    this._initEffect();
  }

  _initBackground() {
    this.challengeBg = new Container();
    this.addChild(this.challengeBg);

    this.challengeMissionBg = new Graphics();
    this.challengeMissionBgTop = new Graphics();
    this.challengeMissionBgMid = new Graphics();
    this.tick = Sprite.from(Assets.get("tickComplete"));
    
    this.challengeMissionBg.beginFill(0xffffff);
    this.challengeMissionBg.position.set(0, -100);
    this.challengeMissionBg.drawRoundedRect(-330, -100, 656, 260, 15); 
    this.challengeMissionBgTop.beginFill(0x5bab16); // 1c2933
    this.challengeMissionBgTop.position.set(0, -100);
    this.challengeMissionBgTop.drawRoundedRect(-330, -100, 656, 100, 15);
    this.challengeMissionBgMid.beginFill(0x5bab16);
    this.challengeMissionBgMid.position.set(0, -100);
    this.challengeMissionBgMid.drawRect(-330, -50, 656, 50);
    this.tick.anchor.set(0.5);
    this.tick.position.set(0, 10);

    this.challengeBg.addChild(this.challengeMissionBg);
    this.challengeBg.addChild(this.challengeMissionBgTop);
    this.challengeBg.addChild(this.challengeMissionBgMid);
    this.challengeBg.addChild(this.tick);

    this.challengeBg.visible = true;
    this.challengeBg.alpha = 0; 
  }

  _initEffect(){
    this.tween1 = new TWEEN.Tween(this.challengeBg)
      .to({alpha: 1}, 300);
    this.tween2 = new TWEEN.Tween(this.challengeBg)
      .to({alpha: 0, x: 0, y: -130}, 500);
    this.tween3 = new TWEEN.Tween(this.challengeBg)
      .to({alpha: 1, x: 0, y: 0}, 600);
    this.tween4 = new TWEEN.Tween(this.challengeBg)
      .to({alpha: 0, x: 0, y: 0}, 500);
  }

  runEffect(lastChallenge, newChallenge){
    this._update(lastChallenge);
    this.challengeMissionBgTop.tint = '5bab16';
    this.challengeMissionBgMid.tint = '5bab16';
    this.tick.visible = true;
    this.tween1.start().onComplete(() => {
      setTimeout(() => {
      this.tween2.start().onComplete(() => {
        this.challengeBg.position.set(0, 80);
        this.challengeMissionBgTop.tint = '1c2933';
        this.challengeMissionBgMid.tint = '1c2933';
        this._update(newChallenge);
        this.lastChallenge = newChallenge;
        this.tick.visible = false;
        setTimeout(() => {
          this.tween3.start().onComplete(() => {
            setTimeout(() => {
              this.tween4.start();
            }, 1700)
          });
        }, 300);
      });
      }, 1300)
    });
  }

  _initText() {
    this._initTextStyle();
    this._initTitle();
  }

  _initTextStyle() {
    this.nameStyle = new TextStyle({
      fill: "#FFFFFF",
      fontFamily: "Blissful Thinking",
      fontSize: 44,
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
    this.challengeName.position.set(0, -150);
    
    this.challengeMissionTitle = new Text();
    this.challengeMissionTitle.text = this.challenge.descriptsion;
    this.challengeMissionTitle.style = this.MissionStyle;
    this.challengeMissionTitle.anchor.set(0.5);
    this.challengeMissionTitle.position.set(0, -60);

    this.challengeBg.addChild(this.challengeName);
    this.challengeBg.addChild(this.challengeMissionTitle);
  }
  _update(challenge){
    this.challenge = challenge;
    this._newTitle();
  }
  _newTitle(){
    this.challengeName.text = `CHALLENGE ${this.challenge.id}`;
    this.challengeMissionTitle.text = this.challenge.descriptsion;
  }
}
