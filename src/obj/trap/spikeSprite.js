import { Assets, Container, Sprite } from "pixi.js";


export class SpikeSprite extends Container{
  constructor(){
    super();
    this._initSprite();
  }
  _initSprite() {
    this.size = 70; // Kích thước cạnh tam giác
    this.sprite = Sprite.from(Assets.get("spike"));
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(1.15 );
    this.addChild(this.sprite);
  }
  changeColor(color){
    this.sprite.tint = color;       
  }
}