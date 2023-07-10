import { Assets } from "pixi.js";
import { GameScene, GameState } from "./gameScene.js";
import { Data } from "../data.js";
import { Background } from "../obj/background/background.js";
import { GameInfor } from "../obj/ui/gameInfor.js";
import { CandyManager } from "../obj/items/candyManager.js";
import { Candy } from "../obj/items/candy.js";
import { Player } from "../obj/player/player.js";
import { Spike } from "../obj/trap/spike.js";
import { LevelController } from "../levelController.js";
import { HardModeUI } from "../obj/ui/main/hardModeUI.js";
import { HardModeOverUI } from "../obj/ui/over/hardModeOverUI.js"
import { SpikesManager } from "../obj/trap/spikesManager.js";

export class HardModeScene extends GameScene {
    constructor() {
        super();
    }

    _initProperties(){
        super._initProperties();
        this.id = 'HardModeScene';
    }

    _initGameplay() {
        this._initBackground();
        this._initPlayer();
        this._initSpikes();
        this._initSceneUI();
        this._initCandies();
        this._initGameInfor();
        this._initGameOverUI();
    }

    _initPlayer(){
        this.player = new Player(this);
        this.player.hardModeEnabled = true;
        this.addChild(this.player);
    }

    _initSpikes(){
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
        this.sceneUI = new HardModeUI();
        this.addChild(this.sceneUI);
    }

    _initGameInfor() {
        this.gameInfor = new GameInfor();
        this.addChild(this.gameInfor);
    }

    _initGameOverUI() {
        this.gameOverUI = new HardModeOverUI();
        this.addChild(this.gameOverUI);
        this.gameOverUI.hideGameOverUI();
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

    _initSceneEvent() {
        this.on("nextLevel", this._onNextLevel.bind(this));
        this.on("lose", this._onLose.bind(this));
        this.gameOverUI.on("replay", this.onResetScene.bind(this));
        this.sceneUI.on("toClassicModeScene", () => {
            this.parent.onStartScene("ClassicModeScene");
        })
        this.background.on("pointerdown", () => {
            this._onPointerDown();
        });
    }

    _onPointerDown() {
        if (this.gameState != GameState.End) {
            if (this.gameState == GameState.Ready) {
                this.sceneUI.hideMainUI();
                this.gameInfor.hideGameInfor();
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
    }

    _onLose() {
        if (this.gameState == GameState.End) {
            return;
        }

        this.gameState = GameState.End;
        Assets.get("loseSound").play();
        this.gameInfor.updateGameInfor();
        this.candies.onLose();
        setTimeout(() => {
            this.gameOverUI.showGameOverUI();
            this.gameInfor.displayGameInfor();
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
