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
    }

    _initSprite() {
        this.candy = Sprite.from(Assets.get("candy"));
        this.scale.set(1.2);
        this.candy.anchor.set(0.5);
        this.addChild(this.candy);
    }

    updateCandyQuantity(eaten){
        if (!eaten) {
            eaten = true;
            Data.itemQuantity++;
        }
    }

    displayCandy() {
        this.addChild(this.candy);
    }

    hideCandy() {
        this.removeChild(this.candy);
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


        //console.log(this.position);
        //console.log(direction, this.x);
        if ((direction && this.x < 0) || 
            (!direction && this.x > 0)) {
                console.log(123);
                this._hideCandy();
                return;
            }
        //if(!this.visible) 
        this._displayCandy();
        if(direction)candyPosition.x = -Game.app.view.width * 4 / 14;
        else candyPosition.x = Game.app.view.width * 4 / 14;

        let randomY = Math.floor(Math.random() * 2);
        if (randomY) candyPosition.y = -Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 3));
        else candyPosition.y = Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 2));
        this.x = candyPosition.x;
        this.y = candyPosition.y;
        this.highestPos = this.y - this.distance;
        this.lowestPos = this.y + this.distance;
    }

    _initEffect(){
        this.spawnEffect = new TWEEN.Tween(this)
        .to({ alpha: 1 }, 2000)
        .onStart(() => {
            this.visible = true;
        });
        this.deSpawnEffect = new TWEEN.Tween(this)
        .to({ alpha: 0 }, 2000)
        .onComplete(() => {
            this.visible = false;
        });
    }
    _hideCandy(){
        this.visible = false;
    }
    _displayCandy(){
        this.visible = true;
    }

    onSpawn() {
        this.alpha = 0;
        this.spawnEffect.start();
    }

    onDead() {
        this.deSpawnEffect.start();
    }

    update() {
        this._candyMove();
    }
}