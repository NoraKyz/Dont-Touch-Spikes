

export class MovementHardMode {
  constructor(parent){
    this.parent = parent;
    this.spikeLeft = parent.spikeLeft;
    this.spikeRight = parent.spikeRight;
    this.distance = parent.distance;
    this._initProperties();
    this.moveSpikes();
  }
  _initProperties(){
    this.leftIndexSpikes = [4, 5];
    this.rightIndexSpikes = [];

    this.constPositionY = [];	
    this.constPositionLeftX = [];	
    this.constPositionRightX = [];	
    this.spikeLeft.forEach(spike => {	
        spike.x -= this.distance;	
        this.constPositionY.push(spike.y);	
        this.constPositionLeftX.push(spike.x);	
    })	
    this.spikeRight.forEach(spike => {	
        spike.x += this.distance;	
        this.constPositionRightX.push(spike.x);	
    })
  };
  moveSpikes(state, limitSpike) {
    this.state = state;
    this.deviatedY = 50 ;
    if (this.state == -1){
        this.spikeRight.forEach((spike, index) => {
            if (this.rightIndexSpikes.includes(index)) {
                const target = { x: this.distance, y: spike.y - this.deviatedY};
                spike.movement.enterHardMode(target);
            }
        })
        this.spikeLeft.forEach((spike, index) => {
            spike.x = this.constPositionLeftX[index];
            spike.y = this.constPositionY[index];
        })
        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                const target = { x: 0, y: spike.y - this.deviatedY};
                spike.movement.goOutHardMode(target);
            }
        })
        this.rightIndexSpikes = this.parent._randomSpike(limitSpike);
    }
    if (this.state == 1) {
        this.spikeRight.forEach((spike, index) => {
            spike.x = this.constPositionRightX[index];
            spike.y = this.constPositionY[index];
        })
        this.spikeRight.forEach((spike, index) => {
            if (this.rightIndexSpikes.includes(index)) {
                const target = { x: 0, y: spike.y + this.deviatedY};
                spike.movement.goOutHardMode(target);
            }
        })
        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                const target = { x: -this.distance, y: spike.y + this.deviatedY};
                spike.movement.enterHardMode(target);
            }
        })
        this.leftIndexSpikes = this.parent._randomSpike(limitSpike);
    }
  }
}