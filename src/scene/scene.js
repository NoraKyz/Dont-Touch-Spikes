import { Container} from "pixi.js";
import { Player } from "../obj/player/player";
import { Game } from "../game";
import { InputEvent, InputManager } from "../custom/inputManager";

export const GameState = Object.freeze({
    Playing: "playing",
    Win: "win",
    Lose: "lose"
});

export class Scene extends Container {
    constructor() {
        super();
        this._initGameplay();
        this._initHandleInput();
    }

    _initHandleInput(){
        InputManager.emitter.on(InputEvent.MouseDown, () => this._onPointerDown);
    }

    _onPointerDown(){

    }

    _initGameplay() {
        this.gameplay = new Container();
        this.gameplay.x = Game.app.screen.width / 2;
        this.gameplay.y = Game.app.screen.height / 2;
        this.addChild(this.gameplay);
        this._initPlayer();
        this._initTraps();
    }

    _initPlayer() {
        this.player = new Player();
        this.gameplay.addChild(this.player);
    }

    _initTraps() {

    }

    update(dt) {
        this.player.update(dt);
    }
}
