import { Container } from "pixi.js";
import { Spike } from "./spike";

export class SpikesManager extends Container {
    constructor() {
        super();
        this.spikesHorizontal = [];
        this.spikeLeft = [];
        this.spikeRight = [];
        this._initSpikes();
    }

    _initSpikes() {
        this.spikesHorizontal.push(this._spawnSpikeLine(-280, 420, 7, 0));
        this.spikesHorizontal.push(this._spawnSpikeLine(280, -520, 7, Math.PI));
    }

    _spawnSpikeLine(startX, startY, numbers, rotation) {
        let spikeLine = new Container();
        let spikes = [];
        const spikeSpacing = 70 * 4 / 3;
      
        for (let i = 0; i < numbers; i++) {
          let spike = new Spike();
          spike.x = i * spikeSpacing; 
          spike.y = 0;
          spikeLine.addChild(spike);
          spikes.push(spike);
        }

        spikeLine.x = startX;
        spikeLine.y = startY;
        spikeLine.rotation = rotation;
        this.addChild(spikeLine);

        return spikes;
    }
      
}