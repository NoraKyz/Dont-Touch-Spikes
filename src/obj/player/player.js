import { Container } from "pixi.js";
import { Collider } from "../physics/collider";
import { Game } from "../../game";
import { Spike } from "../trap/spike";
import { PlayerSprite } from "./playerSprite";
import { PlayerEffect } from "./playerEffect";
import { PlayerMovement } from "./playerMovement";


export class Player extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initProperties();
        this._initCollider();
        this._initEffect();
        this._initMovement();
    }

    _initCollider() {
        this.radiousCollider = 40 / Game.ratio;
        this.collider = new Collider(this.radiousCollider);
        this.addChild(this.collider);
    }

    _initProperties() {     
        this.isPlaying = false;
        this.isDie = false;
    }

    _initSprite() {
        this.playerSprite = new PlayerSprite();
        this.addChild(this.playerSprite);
    }

    _initEffect() {
        this.playerEffect = new PlayerEffect(this);
    }

    _initMovement() {
        this.playerMovement = new PlayerMovement(this);
    }

    onNextLevel() {
        this.playerSprite.changeDirection();
    }

    onPointerDown() {
        if (!this.isPlaying) {
            this.playerMovement.onStart();
            this.isPlaying = true;
        }

        this.playerMovement.onPointerDown();
    }

    onCollision(obj) {
        if (obj instanceof Spike) {
            this.playerMovement.onCollisionSpike();
            this._onLose();
        }
    }

    _onLose() {
        if (this.isDie == true) {
            return;
        }

        this.isDie = true;
        this.playerSprite.onLose();
        this.playerEffect.onLose();
    }

    onReset() {
        this.isDie = false;
        this.isPlaying = false;
        this.position.set(0,0);

        this.playerSprite.onReset();
        this.playerEffect.onReset();
        this.playerMovement.onReset();
    }

    update(dt) {
        this.playerMovement.update(dt);
        this.playerEffect.update(dt);
    }
}
