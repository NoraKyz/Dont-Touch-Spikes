import {PlayerMovement} from "./playerMovement";
import {Game} from "../../game";

export class PlayerMovementDual extends PlayerMovement {
  constructor(obj) {
    super(obj);
  }

  _initProperties() {
    super._initProperties();

    this.obj.victory = false;
    this.topLimit = -Game.app.view.height * 3 / 7;
    this.bottomLimit = Game.app.view.height * 3 / 7;
  }

  onStart() {
    if(this.obj.hardModeEnabled) {
      this.velocity.x = this.jumpForce / 1.2;
    } else {
      this.velocity.x = this.jumpForce / 1.7;
    }
    this.velocity.y = -this.jumpForce;
  }

  update(dt) {
    if(!this.obj.victory) {
      this._move(dt);
    }
  }

}