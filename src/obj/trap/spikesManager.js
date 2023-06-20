import { Container } from "pixi.js";
import { Spike } from "./spike";
import { Game } from "../../game";

export class SpikesManager extends Container {
    constructor() {
        super();
        this.spikesHorizontal = [];
        this.spikeLeft = [];
        this.spikeRight = [];
        this._initSpikes();
    }

    _initSpikes() {
        let startX_Top = - Game.app.view.height / 2 + Game.app.view.height / 14;
        let startX_Bottom = Game.app.view.height * 2.5 / 7;

        this.spikesHorizontal.push(this._spawnSpikeLine(-280, startX_Bottom, 7, 0));
        this.spikesHorizontal.push(this._spawnSpikeLine(280, startX_Top, 7, Math.PI));
        this.spikeLeft.push(this._spawnSpikeLine(- Game.app.view.width / 2, startX_Top + 80, 10, Math.PI / 2));
        this.spikeRight.push(this._spawnSpikeLine(Game.app.view.width / 2,  startX_Bottom - 90, 10, -Math.PI / 2));
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