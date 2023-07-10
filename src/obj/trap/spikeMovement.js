import * as TWEEN from '@tweenjs/tween.js'

export class SpikeMovement{
  constructor(spike, target){
    this.spike = spike;
  }
  _moveClassic(target) {
    this.tween = new TWEEN.Tween(this.spike)
      .to(target, 500)
      .start();
  }
  _moveHardMode(target, direction){
    this.tween1 = new TWEEN.Tween(this.spike)
      .to(target, 300)
      .onComplete(() => {
          let newtarget;
          if(direction == 0) newtarget = {x: target.x, y: target.y + 70};
          else newtarget = {x: target.x, y: target.y - 70};
          this.tween2 = new TWEEN.Tween(this.spike)
          .to(newtarget, 700)
          .yoyo(true)
          .repeat(Infinity)

          this.tween2.start();  
      })
      .start();
  }
  goOutClassic(target){
    this._moveClassic(target);
  }
  enterClassic(target){
    this._moveClassic(target);
  }
  goOutHardMode(target){
    this._moveHardMode(target);
  }
  enterHardMode(target){
    this._moveHardMode(target);
  }
}