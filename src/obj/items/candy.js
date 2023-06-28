import { Sprite, Texture } from "pixi.js";
import { Game } from "../../game";


export class Candy extends Sprite{
  constructor(){
    super(Texture.from('../assets/images/keo.png'));
    this.width = 90;
    this.height = 90;
    this.speed = 0.25;
    this.randomPosition();
    this.distance = 5;
    this.highestPos = this.y - this.distance;
    this.lowestPos = this.y + this.distance;
  }
  _candyMove(){
    if(this.y < this.highestPos) this.speed = -this.speed;
    if(this.y > this.lowestPos) this.speed = -this.speed;
    this.y -= this.speed;
  }
  randomPosition(){
    const candyPosition = {x: 0, y: 0};
    let randomX = Math.floor(Math.random() * 2);
    if(randomX) candyPosition.x = -Game.app.view.width * 5.5 / 14;
    else candyPosition.x = Game.app.view.width * 4 / 14;

    let randomY = Math.floor(Math.random() * 2);
    if(randomY) candyPosition.y = -Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 4));
    else candyPosition.y = Game.app.view.height / 14 * (2 + Math.floor(Math.random() * 2));
    this.x = candyPosition.x;
    this.y = candyPosition.y;
  }
  
  update(){
    this._candyMove();
  }
}