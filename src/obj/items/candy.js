import { Assets, Container, Sprite } from "pixi.js";
import { Game } from "../../game";
import { Collider } from "../physics/collider";

export class Candy extends Container {
    constructor() {
        super();
        this._initSprite();
        this._initCollider();
        this.randomPosition();
        this.speed = 0.25;
        this.distance = 5;
        this.highestPos = this.y - this.distance;
        this.lowestPos = this.y + this.distance;
    }

    _initSprite() {
        this.candy = Sprite.from(Assets.get("candy"));
        this.scale.set(1.3);
        this.candy.anchor.set(0.5);
        // test
        this.addChild(this.candy);
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
        if (randomX) candyPosition.x = -Game.app.view.width * 5.5 / 14;
        else candyPosition.x = Game.app.view.width * 4 / 14;

        let randomY = Math.floor(Math.random() * 2);
        if (randomY) candyPosition.y = -Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 4));
        else candyPosition.y = Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 2));
        this.x = candyPosition.x;
        this.y = candyPosition.y;
    }

    update() {
        this._candyMove();
    }
}