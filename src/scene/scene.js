import { Container } from "pixi.js";
import { Player } from "../obj/player/player";
import { Game } from "../game";
import { SpikesManager } from "../obj/trap/spikesManager";
import { Background } from "../obj/background/background";
import { MainUI } from "../obj/ui/mainUI";
import { Spike } from "../obj/trap/spike";
import { ColliderDetector } from "../obj/physics/colliderDetector";
import { Candy } from "../obj/items/candy";
<<<<<<< HEAD
<<<<<<< HEAD
import { GameOverUI } from "../obj/ui/gameOverUI";
=======
>>>>>>> e817e6b (add candy)
=======
import { GameOverUI } from "../obj/ui/gameOverUI";
>>>>>>> d15ef8e (done mainUI + gameOverUI)

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
        this.gameState = GameState.Ready;  
        this.colliderDetector = ColliderDetector.instance;
        this.colliderDetector.on("collision", this._onCollision.bind(this));     
    }

    _onCollision(obj1, obj2) {
        if (obj1 === this.player && obj2 instanceof Spike) { 
            //this._onLose();
        }
    }

    _initInputHandle() {
        document.addEventListener("pointerdown", () => {
            this._onPointerDown();
        });
    }

    _onPointerDown() {
        if (this.gameState == GameState.Ready) {
            this.player.onPointerDown();
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
        //this._initUI();
        //this._displayGameOver();
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

    _initBackground() {
        this.background = new Background();
        this.gameplay.addChild(this.background);
    }

    _initUI() {
        this.mainUI = new MainUI();
        this.gameplay.addChild(this.mainUI);
    }
    _displayGameOver(){
        this.gameOverUI = new GameOverUI();
        this.gameplay.addChild(this.gameOverUI);
    }
    _displayGameOver(){
        this.gameOverUI = new GameOverUI();
        this.gameplay.addChild(this.gameOverUI);
    }

    update(dt) {
        this.player.update(dt);
        this.colliderDetector.checkCollider(this.player, this.traps.poolSpikes);
        this.traps.update();
    }

    _onLose() {
        this.gameState = GameState.Lose;
    }
}
