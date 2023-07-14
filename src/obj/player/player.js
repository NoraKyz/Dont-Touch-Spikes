import { Container } from "pixi.js";
import { Collider } from "../physics/collider";
import { Game } from "../../game";
import { Spike } from "../trap/spike";
import { PlayerSprite } from "./playerSprite";
import { PlayerEffect } from "./playerEffect";
import { PlayerMovement } from "./playerMovement";
import {PlayerMovementDual} from "./playerMovementDual";

/*
    Class tổng của player
    Gọi method trong player = tất cả method trong các class con
*/
export class Player extends Container {
    constructor(parent) {
        super();
        this.parent = parent;
        this._initEffect();
        this._initMovement();
        this._initSprite();
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
        this.rootPos = {x: 0, y: 0};
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
            if( obj.position.x - obj.radiousCollider >= this.position.x && obj.movement.direction.x == 1) {
                obj.movement.direction.x = -1;
                obj.movement.velocity.x = 0.7;
            } else if (obj.position.x + 2*obj.radiousCollider <= this.position.x && obj.movement.direction.x == -1) {
                obj.movement.direction.x = 1;
                obj.movement.velocity.x = 0.7;
            }
            //
            // if (obj.movement.velocity.y <= -obj.movement.jumpForce * 0.7) {
            //     obj.movement.velocity.y = -obj.movement.jumpForce * 0.7;
            // } else {
            //     obj.movement.velocity.y = -4;
            // }
            // if(obj.movement.position.y + obj.radiousCollider )
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
        console.log(this.rootPos);
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
