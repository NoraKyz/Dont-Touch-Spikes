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

  update(dt) {
    if(!this.obj.victory) {
      this._move(dt);
    }
  }

}