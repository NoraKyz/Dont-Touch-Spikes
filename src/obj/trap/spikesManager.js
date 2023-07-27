import { Container } from "pixi.js";
import { Spike } from "./spike";
import { Game } from "../../game";
import { CommonUtils } from "../../commonUtils";
import { MovementClassic } from "./movementClassic";
import { MovementHardMode } from "./movementHardMode";
import { MovementDuo } from "./movementDuo";


export class SpikesManager extends Container {
    constructor(id) {
        super();
        this.id = id;
        this.state = 0;
        this.distance = (70 ) * Math.sqrt(3) / 2;
        this.minSpikes = 2;
        this.maxSpikes = 5;

        this.spikeLeft = [];
        this.spikeRight = [];
        this.poolSpikes = [];
        this._initSpikes();
        this._initMoveSpikes();
    }
    
    _randomSpike(limitSpike) {
        this.minSpikes = limitSpike.minSpikes;
        this.maxSpikes = limitSpike.maxSpikes;
        let randomQuantitySpikes = CommonUtils.randomInt(this.minSpikes, this.maxSpikes);
        const arrayIndex = CommonUtils.randomArray(randomQuantitySpikes);
        return arrayIndex;
    }

    _initMoveSpikes(){
        switch(this.id){
            case "ClassicModeScene": 
                this.movement = new MovementClassic(this);
                break;
            case "HardModeScene":
                this.movement = new MovementHardMode(this);
                break;
            case "dualModeScene":
                this.movement = new MovementDuo(this);
                break;
        }
    }

    moveSpikes(state, limitSpike) {
        this.movement.moveSpikes(state, limitSpike);
    }

    _initSpikes() {
        let startY_Top = - 525 ;
        let startY_Bottom = 434 ;

        this.spikesTop = this._spawnSpikeLine(-280 , startY_Top, 7, Math.PI, 1);
        this.spikesBottom = this._spawnSpikeLine(-280 , startY_Bottom, 7, 0, 1);
        this.spikeLeft = this._spawnSpikeLine(-Game.app.view.width / 2 + 24 , startY_Top + 80 , 10, Math.PI / 2, 0);
        this.spikeRight = this._spawnSpikeLine(Game.app.view.width / 2 - 24 , startY_Top + 80 , 10, - Math.PI / 2, 0);

        this.spikeLeft.forEach(spike => spike.x -= this.distance);
        this.spikeRight.forEach(spike => spike.x += this.distance);
    }
    _addPoolSpike(array) {
        array.forEach(spike => this.poolSpikes.push(spike));
    }
    
    _spawnSpikeLine(startX, startY, numbers, rotation, dir) {
        // dir = 1 => vẽ hàng, ngược lại vẽ cột
        let spikeLine = new Container();
        let spikes = [];
        const spikeSpacing = (70 ) * 4 / 3;

        for (let i = 0; i < numbers; i++) {
            let spike = new Spike();
            if (dir === 1) {
                spike.x = i * spikeSpacing;
                spike.y = 0;
            } else {
                spike.x = 0;
                spike.y = i * spikeSpacing;
            }
            spike.rotation = rotation;
            spikeLine.addChild(spike);
            spikes.push(spike);
        }
        spikeLine.x = startX;
        spikeLine.y = startY;
        this.addChild(spikeLine);
        this._addPoolSpike(spikes);
        return spikes;
    }

    changeColor(color) {
        this.poolSpikes.forEach(spike => {
            spike.sprite.changeColorEffect(color);
        })
    }

    setColor(color) {
        this.poolSpikes.forEach(spike => {
            spike.sprite.changeColor(color);
        })
    }
    onReset() {
        this.setColor("FFFFFF");
        this.movement.onReset();
    }
}