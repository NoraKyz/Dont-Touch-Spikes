import { Container } from "pixi.js";
import { Collider } from "../physics/collider";
import { Game } from "../../game";
import { Spike } from "../trap/spike";
import { PlayerSprite } from "./playerSprite";
import { PlayerEffect } from "./playerEffect";
import { PlayerMovement } from "./playerMovement";


export class Player extends Container {
    constructor(parent) {
        super();
        this.parent = parent;
        this._initSprite();
        this._initProperties();
        this._initCollider();
        this._initMovement();
        this._initEffect();
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
        this.sprite = new PlayerSprite();
        this.addChild(this.sprite);
    }

    _initEffect() {
        this.effect = new PlayerEffect(this);
    }

    _initMovement() {
        this.movement = new PlayerMovement(this);
    }

    onNextLevel() {
        this.sprite.changeDirection();
    }

    onPointerDown() {
        if (!this.isPlaying) {
            this.movement.onStart();
            this.isPlaying = true;
        }
        this.movement.onPointerDown();
    }

    onCollision(obj) {
        if (obj instanceof Spike) {
            this.movement.onCollisionSpike();
            this._onLose();
        }
    }

    _onLose() {
        this.isDie = true;
        this.sprite.onLose();
        this.effect.onLose();
    }

    onReset() {
        this.isDie = false;
        this.isPlaying = false;
        this.position.set(0,0);

        this.sprite.onReset();
        this.effect.onReset();
        this.movement.onReset();
    }

    update(dt) {
        this.movement.update(dt);
        this.effect.update(dt);
    }
}
