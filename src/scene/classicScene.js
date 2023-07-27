import { Assets } from "pixi.js";
import { GameScene, GameState } from "./gameScene.js";
import { Data } from "../data.js";
import { Background } from "../obj/background/background.js";
import { ClassicUI } from "../obj/ui/main/classicUI.js";
import { GameInfor } from "../obj/ui/gameInfor.js";
import { CandyManager } from "../obj/items/candyManager.js";
import { Candy } from "../obj/items/candy.js";
import { Player } from "../obj/player/player.js";
import { SpikesManager } from "../obj/trap/spikesManager.js";
import { ClassicOverUI } from "../obj/ui/over/classicOverUI.js";
import { Spike } from "../obj/trap/spike.js";
import { LevelController } from "../levelController.js";
import { SkinsShop } from "../obj/ui/shop/skin/skinsShop.js";
import { ChallengesManager } from "../obj/challenges/challengesManager.js";

export class ClassicScene extends GameScene {
    constructor() {
        super();
    }

    _initProperties() {
        super._initProperties();
        this.id = "ClassicModeScene";
    }

    _initGameplay() {
        this._initBackground();
        this._initPlayer();
        this._initSkinsShop();
        this._initSpikes();
        this._initSceneUI();
        this._initCandies();
        this._initGameInfor();
        this._initGameOverUI();
    }   

    // Obj in scene
    _initPlayer() {
        this.player = new Player(this);
        this.player.hardModeEnabled = false;
        this.player.dualModeEnabled = false;
        this.addChild(this.player);
    }

    _initSpikes() {
        this.spikes = new SpikesManager(this.id);
        this.addChild(this.spikes);
    }

    _initCandies() {
        this.candies = new CandyManager();
        this.addChild(this.candies);
    }

    _initBackground() {
        this.background = new Background();
        this.addChild(this.background);
    }

    _initSceneUI() {
        this.sceneUI = new ClassicUI();
        this.addChild(this.sceneUI);
    }

    _initGameInfor() {
        this.gameInfor = new GameInfor();
        this.addChild(this.gameInfor);
    }

    _initGameOverUI() {
        this.gameOverUI = new ClassicOverUI();
        this.addChild(this.gameOverUI);
        this.gameOverUI.hideGameOverUI();
    }

    _initSkinsShop() {
        this.skinsShop = new SkinsShop();
        this.addChild(this.skinsShop);
    }

    _initChallenge() {
        this.challenge = new Challenge();
    }

    _onCollision(obj1, obj2) {
        if(!this.parent) return;
        if (obj1 === this.player && obj2 instanceof Spike) {
            this._onLose();
            this.player.onCollision(obj2);
        }

        if (obj1 === this.player && obj2 instanceof Candy) {
            if (this.gameState != GameState.End) {
                Assets.get("eatingSound").play();
                this.candies.onCollision(obj2);
            }
        }
    }

    _initSceneEvent() {
        this.on("nextLevel", this._onNextLevel.bind(this));
        this.on("lose", this._onLose.bind(this));
        this.gameOverUI.on("replay", this.onResetScene.bind(this));
        this.sceneUI.on("startSkinsShopUI", () => {
            this._onStartSkinsShop();
        });
        this.skinsShop.on("close", () => {
            this._onCloseSkinsShop();
            this.player.updateSkin();
        });
        this.background.on("pointerdown", () => {
            this._onPointerDown();
        });
        this.sceneUI.on("toHardModeScene", () => {
            this.parent.onStartScene("HardModeScene");
        });
        this.sceneUI.on("toDualModeScene", () => {
            this.parent.onStartScene("dualModeScene");
        })
        this.sceneUI.on("toChallengesScene", () => {
            this.parent.onStartScene("ChallengesScene");
        })
    }

    _onStartChallenge() {
        this.gameState = GameState.PlayDisabled;
        
        this.sceneUI.hideMainUI();
        this.gameInfor.hide();
        this.player.hide();
        this.background.hideScoreBackground();
    }

    _onStartSkinsShop() {
        this.gameState = GameState.PlayDisabled;
        this.skinsShop.onStart();
        this.sceneUI.hideMainUI();
        this.gameInfor.hide();
        this.player.hide();
        this.background.hideScoreBackground();
    }

    _onCloseSkinsShop() {
        this.background.showScoreGround();
        this.skinsShop.onClose();
        this.onResetScene();
    }

    _onPointerDown() {
        if (this.gameState == GameState.Ready || this.gameState == GameState.Playing) {
            if (this.gameState == GameState.Ready) {
                this.sceneUI.hideMainUI();
                this.gameInfor.hide();
                this.background.displayScore();
            }
            this.player.onPointerDown();
            this.gameState = GameState.Playing;
            Assets.get("flyingSound").play();
        }
    }

    onResetScene() {
        Data.resetScore();
        this.gameInfor.onReset();
        this.player.onReset();
        this.spikes.onReset();
        this.background.onReset();
        this.sceneUI.onReset();
        this.gameOverUI.onReset();
        this.candies.onReset();
        this.gameState = GameState.Ready;
        this.challengesManager.checker._resetData();
    }

    // Mở rộng thêm để xử lý scene
    _onLose() {
        if (this.gameState == GameState.End) {
            return;
        }

        this.gameState = GameState.End;
        this.challengesManager.update(this.id);
        Data.pushData();
        Assets.get("loseSound").play();
        this.gameInfor.updateGameInfor();
        this.candies.onLose();
        setTimeout(() => {
            this.gameOverUI.showGameOverUI();
            this.gameInfor.onReset();
            this.background.hideScore();
        }, 1000);
    }

    _onNextLevel(direction) {
        if (this.gameState == GameState.End) {
            return;
        }
        this.candies.onNextLevel(this.player.movement.direction.x);
        this.player.onNextLevel();
        this.background.updateBackground(++Data.currentScore);
        let limitSpike = LevelController.updateLevel();
        this.spikes.moveSpikes(direction, limitSpike);

        if (Data.currentScore >= 5) {
            this.spikes.changeColor(this.background.originColor.colorDarker);
        }
    }

    update(dt) {
        this.player.update(dt);
        if (this.gameState == GameState.Playing) {
            this.colliderDetector.checkCollider(this.player, this.spikes.poolSpikes);
            this.colliderDetector.checkCollider(this.player, this.candies.children);
            this.candies.update(dt);
        }
    }
}