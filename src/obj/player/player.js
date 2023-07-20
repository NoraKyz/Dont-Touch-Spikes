import { Container } from "pixi.js";
import { Collider } from "../physics/collider";
import { Spike } from "../trap/spike";
import { PlayerSprite } from "./playerSprite";
import { PlayerEffect } from "./playerEffect";
import { PlayerMovement } from "./playerMovement";
import { PlayerMovementDual } from "./playerMovementDual";

/*
    Class tổng của player
    Gọi method trong player = tất cả method trong các class con
*/
export class Player extends Container {
    constructor(parent) {
        super();
        this.parent = parent;
        this._initSprite();
        this._initEffect();
        this._initMovement();     
        this._initProperties();
        this._initCollider();
    }

    _initCollider() {
        this.radiousCollider = 40;
        this.collider = new Collider(this.radiousCollider);
        this.addChild(this.collider);
    }

    _initProperties() {
        this.isPlaying = false;
        this.isDie = false;
        this.hardModeEnabled = false;
        this.dualModeEnabled = false;
        this.rootPos = { x: 0, y: 0 };
    }

    _initSprite() {
        this.sprite = new PlayerSprite(this);
        this.addChild(this.sprite);
    }

    _initEffect() {
        this.effect = new PlayerEffect(this, this.parent);
    }

    _initMovement() {
        switch (this.parent.id) {
            case 'dualModeScene':
                this.movement = new PlayerMovementDual(this);
                break;
            default:
                this.movement = new PlayerMovement(this);
        }
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
        this.effect.onPointerDown();
        this.sprite.onPointerDown();
    }

    onCollision(obj) {
        if (obj instanceof Spike) {
            this.movement.onCollisionSpike();
            this._onLose();
        }

        if (obj instanceof Player) {

        }
    }

    updateSkin() {
        this.sprite.updateSkin();
    }

    _onLose() {
        this.isDie = true;
        this.sprite.onLose();
        this.effect.onLose();
    }

    hide() {
        this.alpha = 0;
    }

    onReset() {
        this.isDie = false;
        this.isPlaying = false;

        this.position = this.rootPos;

        this.sprite.onReset();
        this.effect.onReset();
        this.movement.onReset();
    }

    update(dt) {
        this.movement.update(dt);
        this.effect.update(dt);
        this.sprite.update();
    }
}
