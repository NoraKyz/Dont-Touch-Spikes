import { Game } from "../../game";

export class CandySpawner {
    constructor(obj) {
        this.obj = obj;
    }

    onSpawn(direction) {
        this.randomPosition(direction);
    }

    randomPosition(direction) {
        const candyPosition = { x: 0, y: 0 };

        if (direction === 1) candyPosition.x = -Game.app.view.width * 4 / 14;
        else candyPosition.x = Game.app.view.width * 4 / 14;

        let randomY = Math.floor(Math.random() * 2);
        if (randomY) candyPosition.y = - Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 3));
        else candyPosition.y = Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 2));

        this.obj.x = candyPosition.x;
        this.obj.y = candyPosition.y;
    }
}