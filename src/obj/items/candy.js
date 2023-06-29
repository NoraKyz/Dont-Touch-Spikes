import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { Data } from "../../data";
import * as TWEEN from '@tweenjs/tween.js'

export class Candy extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initCollider();
        this._initEffect();
        this.randomPosition();
        this.speed = 1;
        this.distance = 20;
        this.highestPos = this.y - this.distance;
        this.lowestPos = this.y + this.distance;
        this.enableEating = true;
    }

    _initSprite() {
        this.candy = Sprite.from(Assets.get("candy"));
        this.scale.set(1.2);
        this.candy.anchor.set(0.5);
        this.addChild(this.candy);
    }


    updateCandyQuantity() {
        this.enableEating = false;
        Data.itemQuantity++;
    }

    displayCandy() {
        this.visible = true;
    }

    _hideCandy() {
        this.visible = false;
    }

    _initCollider() {
        const colliderRadious = 18;
        this.collider = new Collider(colliderRadious);
        this.addChild(this.collider);
    }

    _candyMove() {
        if (this.y < this.highestPos) this.speed = -this.speed;
        if (this.y > this.lowestPos) this.speed = -this.speed;
        this.y -= this.speed;
    }

    randomPosition(direction) {
        const candyPosition = { x: 0, y: 0 };
        if(direction === 1) candyPosition.x = -Game.app.view.width * 4 / 14;
        else candyPosition.x = Game.app.view.width * 4 / 14;
    
        let randomY = Math.floor(Math.random() * 2);
        if (randomY) candyPosition.y = -Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 3));
        else candyPosition.y = Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 2));

        this.x = candyPosition.x;
        this.y = candyPosition.y;
        this.highestPos = this.y - this.distance;
        this.lowestPos = this.y + this.distance;

        this._hideCandy();
    }

    _initEffect() {
        this._spawnEffect();
        this._despawnEffect();
    }

    _spawnEffect() {
        this.spawnEffect = new TWEEN.Tween(this)
            .to({ alpha: 1 }, 2000)
            .onStart(() => {
                this.visible = true;
        });
    }

    _despawnEffect() {
        this.despawnEffect = new TWEEN.Tween(this)
            .to({ alpha: 0 }, 2000)
            .onComplete(() => {
                this.visible = false;
        });
    }

    onSpawn() {
        this.alpha = 0;
        this.spawnEffect.start();
    }
    
    onDead() {
        this.despawnEffect.start();
    }

    update() {
        this._candyMove();
    }
}