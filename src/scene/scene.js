import { Container} from "pixi.js";
import { GameConstant } from "../gameConstant";

export const GameState = Object.freeze({
    Playing: "playing",
    Win: "win",
    Lose: "lose"
});

export class Scene extends Container {
    constructor() {
        super();
        this._initGameplay();
    }

    _initGameplay() {
        this.gameplay = new Container();
        this.gameplay.x = GameConstant.GAME_WIDTH / 2;
        this.gameplay.y = GameConstant.GAME_HEIGHT / 2;
        this.addChild(this.gameplay);
        this._initPlayer();
        this._initTraps();
    }

    _initPlayer() {

    }

    _initTraps() {

    }

    update(dt) {

    }
}
