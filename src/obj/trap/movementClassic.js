

export class MovementClassic {
  constructor(parent){
    this.parent = parent;
    this.spikeLeft = parent.spikeLeft;
    this.spikeRight = parent.spikeRight;
    this.distance = parent.distance;
    this._initProperties();
  }
  _initProperties(){
    this.leftIndexSpikes = [4, 5];
    this.rightIndexSpikes = [];
  };
  moveSpikes(state, limitSpike) {
    this.state = state;
    if (this.state == -1){
        this.spikeRight.forEach((spike, index) => {
            if (this.rightIndexSpikes.includes(index)) {
                const target = { x: this.distance, y: spike.y};
                spike.movement.enterClassic(target);
            }
        })
        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                const target = { x: 0, y: spike.y };
                spike.movement.goOutClassic(target);
            }
        })
        this.rightIndexSpikes = this.parent._randomSpike(limitSpike);
    }
    if (this.state == 1) {
        this.spikeRight.forEach((spike, index) => {
            if (this.rightIndexSpikes.includes(index)) {
                const target = { x: 0, y: spike.y };
                spike.movement.goOutClassic(target);
            }
        })
        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                const target = { x: -this.distance, y: spike.y };
                spike.movement.enterClassic(target);
            }
        })
        this.leftIndexSpikes = this.parent._randomSpike(limitSpike);
    }
    }
    onReset(){
        this.spikeRight.forEach((spike, index) => {
          if (this.rightIndexSpikes.includes(index)) {
              spike.x = this.distance;
            }
        })
        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                spike.x = -this.distance;
            }
        })
        this.leftIndexSpikes = [4, 5];
        this.rightIndexSpikes = [];
    }
}