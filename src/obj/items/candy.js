import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { Data } from "../../data";

export class Candy extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initCollider();
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
            console.log(123);
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

    randomPosition() {
        const candyPosition = { x: 0, y: 0 };
        let randomX = Math.floor(Math.random() * 2);
        if (randomX) candyPosition.x = -Game.app.view.width * 4 / 14;
        else candyPosition.x = Game.app.view.width * 4 / 14;

        let randomY = Math.floor(Math.random() * 2);
        if (randomY) candyPosition.y = -Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 3));
        else candyPosition.y = Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 2));
        this.x = candyPosition.x;
        this.y = candyPosition.y;
        this.highestPos = this.y - this.distance;
        this.lowestPos = this.y + this.distance;
    }

    update() {
        //console.log(123);
        this._candyMove();
    }
}