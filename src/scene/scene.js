import {Assets, Container, Texture} from "pixi.js";
import { Player } from "../obj/player/player";
import { Game } from "../game";
import { SpikesManager } from "../obj/trap/spikesManager";
import { Background } from "../obj/background/background";
import { MainUI } from "../obj/ui/mainUI";
import { Spike } from "../obj/trap/spike";
import { ColliderDetector } from "../obj/physics/colliderDetector";
import { GameOverUI } from "../obj/ui/gameOverUI";
import { GameManager } from "../custom/gameManager";
import { Data } from "../data";
import { Candy } from "../obj/items/candy";
import { GameInfor } from "../obj/ui/gameInfor";
import {Emitter, upgradeConfig} from "@pixi/particle-emitter";
import config from "../../assets/aim/emitter.json";


export const GameState = Object.freeze({
    Ready: "ready",
    Playing: "playing",
    Win: "win",
    Lose: "lose"
});

export class Scene extends Container {
    constructor() {
        super();
        this.emitx = Game.app.stage.width / 2;
        this.emity = Game.app.stage.height / 2;
        this._initGameplay();
        this._initInputHandle();
        this._initColliderDetector();
        this._initGameManager();
        this._initGameOver();
        this.gameState = GameState.Ready;
    }

    _initParticle() {
        let texture = Texture.from("circle");
        this.emitter = new Emitter(this.gameplay, upgradeConfig(config, [texture]));
        this.emitter.emit = false;
    }

    _updateEmitterPosition() {
        this.emitter.updateSpawnPos(this.player.position.x, this.player.position.y)
    }

    _initColliderDetector() {
        this.colliderDetector = ColliderDetector.instance;
        this.colliderDetector.on("collision", this._onCollision.bind(this));
    }

    _onCollision(obj1, obj2) {
        if (obj1 === this.player && obj2 instanceof Spike) {
            this._onLose();
            this.player.onCollision(obj2);
        }

        if (obj1 === this.player && obj2 instanceof Candy) {
            if (this.gameState != GameState.Lose && this.candy.enableEating) {
                Assets.get("eatingSound").play();
                this.candy.randomPosition(this.player.direction.x);
                this.candy.updateCandyQuantity();
            }
        }
    }

    _initGameManager() {
        this.gameManager = GameManager.instance;
        this.gameManager.on("nextLevel", this._onNextLevel.bind(this));
        this.gameManager.on("lose", this._onLose.bind(this));
        this.gameManager.on("replay", this._reloadScene.bind(this));
    }

    _reloadScene() {
        Data.resetScore();
        this.player.onReset();
        this.traps.onReset();
        this.background.onReset();
        this.mainUI.onReset();
        this.gameOverUI.onReset();

        setTimeout(() => {
            this.gameState = GameState.Ready;
        }, 100);
    }

    _onNextLevel(direction) {
        if (this.gameState == GameState.Lose) {
            return;
        }

        this.candy.enableEating = true;
        this.background.updateBackground(++Data.currentScore);
        let limitSpike = this.gameManager.updateLevel();
        this.traps.moveSpikes(direction, limitSpike);
        if (Data.currentScore >= 5) this.traps.changeColor(this.background.mainColor.colorDarker);
        if (this.candy.visible == false) this.candy.displayCandy();
    }

    _onLose() {
        if (this.gameState == GameState.Lose) return;
        this.gameState = GameState.Lose;
        setTimeout(() => {
            this.gameOverUI.showGameOverUI();
            this.gameInfor.displayGameInfor();
            this.background.hideScore();
        }, 1000);
        this.gameInfor.updateGameInfor();
        this.candy.onDead();
    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => {
            this._onPointerDown();
        });
    }

    _onPointerDown() {
        if (this.gameState != GameState.Lose) {
            if (this.gameState == GameState.Ready) {
                this.mainUI.hideMainUI();
                this.gameInfor.hideGameInfor();
                this.candy.onSpawn();
                this.background.displayScore();
            }
            this.player.onPointerDown();
            this.gameState = GameState.Playing;
            Assets.get("flyingSound").play();
            this.emitter.emit = true;
            setTimeout(() => {
                this.emitter.emit = false;
            }, 400);
        }
    }

    _initGameplay() {
        this.gameplay = new Container();
        this.gameplay.x = Game.app.screen.width / 2;
        this.gameplay.y = Game.app.screen.height / 2;
        this.addChild(this.gameplay);
        this._initParticle();
        this._initBackground();
        this._initPlayer();
        this._initTraps();
        this._initCandy();
        this._initUI();
        this._initGameInfor();
    }

    resize() {
        this.gameplay.x = Game.app.screen.width / 2;
        this.gameplay.y = Game.app.screen.height / 2;
    }

    _initPlayer() {
        this.player = new Player();
        this.gameplay.addChild(this.player);
    }

    _initTraps() {
        this.traps = new SpikesManager();
        this.gameplay.addChild(this.traps);
    }

    _initCandy() {
        this.candy = new Candy();
        this.gameplay.addChild(this.candy);
        this.candy.visible = false;
    }

    _initBackground() {
        this.background = new Background();
        this.gameplay.addChild(this.background);
    }

    _initUI() {
        this.mainUI = new MainUI();
        this.gameplay.addChild(this.mainUI);
    }
    _initGameInfor() {
        this.gameInfor = new GameInfor();
        this.gameplay.addChild(this.gameInfor);
    }

    _initGameOver() {
        this.gameOverUI = new GameOverUI();
        this.gameplay.addChild(this.gameOverUI);
        this.gameOverUI.hideGameOverUI();
    }

    update(dt) {
        this.player.update(dt);
        if (this.gameState == GameState.Playing) {
            this.colliderDetector.checkCollider(this.player, this.traps.poolSpikes);
            this.colliderDetector.checkCollider(this.player, this.candy);
            this.traps.update();
            this.candy.update();
            this._updateEmitterPosition();
        }
        this.emitter.update(dt * 0.1);
    }
}
