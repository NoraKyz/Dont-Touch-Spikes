import { Assets, Container } from "pixi.js";
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


export const GameState = Object.freeze({
    Ready: "ready",
    Playing: "playing",
    Win: "win",
    Lose: "lose"
});

export class Scene extends Container {
    constructor() {
        super();
        this._initGameplay();
        this._initInputHandle();
        this._initColliderDetector();
        this._initGameManager();    
        this.gameState = GameState.Ready;
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
    }

    _initGameManager() {
        this.gameManager = GameManager.instance;
        this.gameManager.on("nextLevel", this._onNextLevel.bind(this));
        this.gameManager.on("lose", this._onLose.bind(this));
    }

    _onNextLevel(direction) {
        if(this.gameState == GameState.Lose) {
            return;
        }
        this.background.updateBackground(++Data.currentScore); 
        this.traps._moveSpikes(direction); 
        if(Data.currentScore >= 5) this.traps.changeColor(this.background.mainColor.colorDarker);
    }

    _onLose() {
        this.gameState = GameState.Lose;

        this.player.isDie = true;
        setTimeout(() => this._initGameOver(), 1000);

    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => {
            this._onPointerDown();
        });
    }

    _onPointerDown() {
        if (this.gameState == GameState.Ready) {
            this.player.onPointerDown();
            Assets.get("flySound").play();
        }
    }

    _initGameplay() {
        this.gameplay = new Container();
        this.gameplay.x = Game.app.screen.width / 2;
        this.gameplay.y = Game.app.screen.height / 2;
        this.addChild(this.gameplay);
        this._initBackground();
        this._initPlayer();
        this._initTraps();
        this._initCandy();
        this._initUI();
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

    _initCandy(){
        this.candy = new Candy();
        this.gameplay.addChild(this.candy);
    }

    _initBackground() {
        this.background = new Background();
        this.gameplay.addChild(this.background);
    }

    _initUI() {
        this.mainUI = new MainUI();
        this.gameplay.addChild(this.mainUI);
    }


    _displayGameOver() {
        this.gameplay.addChild(this.gameOverUI);
    }

    _initGameOver(){
        this.gameOverUI = new GameOverUI();
        this.gameplay.addChild(this.gameOverUI);
    }

    update(dt) {
        this.player.update(dt);
        this.colliderDetector.checkCollider(this.player, this.traps.poolSpikes);
        this.traps.update();
        this.candy.update();
    }
}
