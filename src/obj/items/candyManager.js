import { Container } from "pixi.js";
import { Candy } from "./candy";

export class CandyManager extends Container {
    constructor() {
        super();
        this.pool = [];
        this._initProerties();
    }

    _initProerties() {
        this.isEaten = true;
        this.isFirstSpawn = true;
    }

    _spawnCandy(direction) {
        if (this.pool.length == 0) {
            let candy = new Candy();

            if (this.isFirstSpawn) {
                this.isFirstSpawn = false;
                candy.onFirstSpawn(direction);
            } else {
                candy.onSpawn(direction);
            }

            this.addChild(candy);
            return candy;
        }

        let candy = this.pool.pop();

        if (this.isFirstSpawn) {
            this.isFirstSpawn = false;
            candy.onFirstSpawn(direction);
        } else {
            candy.onSpawn(direction);
        }
        
        this.addChild(candy);
    }

    _despawnCandy(candy) {
        this.removeChild(candy);
        this.pool.push(candy);
    }

    onNextLevel(direction) {
        if (this.isEaten) {
            this.isEaten = false;
            this._spawnCandy(direction);
        }
    }

    onLose() {
        this.children.forEach(candy => {
            candy.onLose();
        });
    }

    onCollision(candy) {
        this.isEaten = true;
        candy.onCollision();
        this._despawnCandy(candy);
    }

    onReset() {
        this.isEaten = true;
        this.isFirstSpawn = true;
        this.children.forEach(candy => {
            this._despawnCandy(candy);
        });
    }

    update(dt) {
        this.children.forEach(candy => {
            candy.update(dt);
        });
    }
}