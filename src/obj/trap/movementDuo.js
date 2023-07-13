

export class MovementDuo {
  constructor(parent){
    this.parent = parent;
    this.spikeLeft = parent.spikeLeft;
    this.spikeRight = parent.spikeRight;
    this.distance = parent.distance;
    this._initProperties();
  }

    _initProperties(){
        this.leftIndexSpikes = [];
        this.rightIndexSpikes = [];
    };

    moveSpikes(state, limitSpike) {
        this.state = state;
        console.log(this.leftIndexSpikes, this.rightIndexSpikes);

        this.spikeRight.forEach((spike, index) => {
          if (this.rightIndexSpikes.includes(index)) {
              const target = { x: this.distance, y: spike.y};
              spike.movement.enterClassic(target);
          }
        })
        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                const target = { x: -this.distance, y: spike.y };
                spike.movement.enterClassic(target);
            }
        })

        this.rightIndexSpikes = this.parent._randomSpike(limitSpike);
        this.leftIndexSpikes = [...this.rightIndexSpikes];

        this.spikeLeft.forEach((spike, index) => {
            if (this.leftIndexSpikes.includes(index)) {
                const target = { x: 0, y: spike.y };
                spike.movement.goOutClassic(target);
            }
        })
        this.spikeRight.forEach((spike, index) => {
            if (this.rightIndexSpikes.includes(index)) {
              const target = { x: 0, y: spike.y };
              spike.movement.goOutClassic(target);
            }
        })
      
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
        this.leftIndexSpikes = [];
        this.rightIndexSpikes = [];
    }
}