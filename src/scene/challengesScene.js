import { Container } from "pixi.js";
import { GameConstant } from "../gameConstant";
import { BackgroundChallenges } from "../obj/background/backgroundChallenges";
import { ChallengesUI } from "../obj/ui/main/challengesUI";
import { ChallengeCard } from "../obj/ui/challenges/challengesCard";
import { ChallengesManager } from "../obj/challenges/challengesManager";

export class ChallengesScene extends Container {
  constructor() {
    super();
    this._initProperties();
    this._initComponents();
    this._initEvent();
  }

  _initProperties() {
    this.id = "ChallengesScene";
    this.x = GameConstant.GAME_WIDTH / 2;
    this.y = GameConstant.GAME_HEIGHT / 2;
    this.challengesManager = ChallengesManager.instance;
  }

  _initComponents() {
    this._initBackground();
    this._initSceneUI();
    this._initChallengeCard();
  }

  _initBackground() {
    this.background = new BackgroundChallenges();
    this.addChild(this.background);
  }

  _initSceneUI() {
    this.sceneUI = new ChallengesUI();
    this.addChild(this.sceneUI);
  }

  _initChallengeCard() {
    this.ChallengeCard = new ChallengeCard(this.challengesManager.currentChallenge);
    this.addChild(this.ChallengeCard);
  }

  _initEvent() {
    this.sceneUI.on("toClassicModeScene", () => {
      this.parent.onStartScene("ClassicModeScene");
    });
  }

  onResetScene() {}

  onResize() {}

  update(dt) {}
}
