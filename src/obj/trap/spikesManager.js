import { Container } from "pixi.js";
import { Spike } from "./spike";
import { Game } from "../../game";
import { Collider } from "../physics/collider";

export class SpikesManager extends Container {
    constructor() {
        super();
        this.spikeLeft = [];
        this.spikeRight = [];
        this.poolSpikes = [];
        this._initSpikes();
        this._initColliders();
    }

    _initSpikes() {
        let startX_Top = - Game.app.view.height / 2 + Game.app.view.height / 14;
        let startX_Bottom = Game.app.view.height * 2.5 / 7;

        this.spikesTop = this._spawnSpikeLine(280, startX_Top, 7, Math.PI);
        this.spikesBottom = this._spawnSpikeLine(-280, startX_Bottom, 7, 0);
        this.spikeLeft.push(this._spawnSpikeLine(- Game.app.view.width / 2, startX_Top + 80, 10, Math.PI / 2));
        this.spikeRight.push(this._spawnSpikeLine(Game.app.view.width / 2, startX_Bottom - 90, 10, -Math.PI / 2));
    }

    _addPoolSpike(array) {
        array.forEach(spike => {
            this.poolSpikes.push(spike);
        })
    }

    _initColliders() {
        let colliderRadious = 70 * Math.sqrt(3) / 3
        this.poolSpikes.forEach(spike => {
            let collider = new Collider(colliderRadious);
            spike.collider = collider;
            spike.addChild(collider);
        });
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

        this._addPoolSpike(spikes);

        return spikes;
    }

}