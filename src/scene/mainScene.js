import { Assets } from "pixi.js";
import { GameScene, GameState } from "./gameScene.js";
import { Data } from "../data.js";

export class MainScene extends GameScene {
    constructor() {
        super();
    }

    _onCollision(obj1, obj2) {
        super._onCollision();

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

    _onAddEventGM() {
        this.gameManager.on("nextLevel", this._onNextLevel.bind(this));
        this.gameManager.on("lose", this._onLose.bind(this));
        this.gameManager.on("replay", this._reloadScene.bind(this));
    }

    _onLose() {
        if (this.gameState == GameState.End) {
            return;
        }

        this.gameState = GameState.End;
        this.gameInfor.updateGameInfor();
        this.candies.onLose();
        setTimeout(() => {
            this.gameOverUI.showGameOverUI();
            this.gameInfor.displayGameInfor();
            this.background.hideScore();
        }, 1000);       
    }

    _reloadScene() {
        super.onReloadScene();

        Data.resetScore();
        this.gameOverUI.onReset();
        this.candies.onReset();
    }

    _initGameplay() {
        super._initGameplay();

        this._initCandies();
        this._initGameInfor();
    }

    _onNextLevel() {
        super._onNextLevel();

        this.candies.onNextLevel(this.player.movement.direction.x);
        this.player.onNextLevel();
        this.background.updateBackground(++Data.currentScore);
        let limitSpike = this.gameManager.updateLevel();
        this.traps.moveSpikes(direction, limitSpike);
        if (Data.currentScore >= 5) {
            this.traps.changeColor(this.background.mainColor.colorDarker);
        }
    }

    _onPointerDown() {
        if (this.gameState != GameState.End) {
            if (this.gameState == GameState.Ready) {
                this.mainUI.hideMainUI();
                this.gameInfor.hideGameInfor();
                this.background.displayScore();
            }
            this.player.onPointerDown();
            this.gameState = GameState.Playing;
            Assets.get("flyingSound").play();
        }
    }

    _initBackground() {
        this.background = new Background();
        this.addChild(this.background);
    }

    _initSceneUI() {
        this.mainUI = new MainUI();
        this.addChild(this.mainUI);
    }

    _initGameInfor() {
        this.gameInfor = new GameInfor();
        this.addChild(this.gameInfor);
    }

    _initGameOver() {
        this.gameOverUI = new GameOverUI();
        this.addChild(this.gameOverUI);
        this.gameOverUI.hideGameOverUI();
    }

    update(dt) {
        this.player.update(dt);
        if (this.gameState == GameState.Playing) {
            this.colliderDetector.checkCollider(this.player, this.traps.poolSpikes);
            this.colliderDetector.checkCollider(this.player, this.candies.children);
            this.traps.update();
            this.candies.update(dt);
        }
    }
}