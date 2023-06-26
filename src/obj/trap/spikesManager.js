import { Container } from "pixi.js";
import { Spike } from "./spike";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { CommonUtils } from "../../commonUtils";

export class SpikesManager extends Container {
    constructor() {
        super();
        this.state = 0;
        this.distance = 70 * Math.sqrt(3) / 2;
        this.velocity = this.distance / 30;
        this.minSpikes = 1;
        this.maxSpikes = 7;
        this.leftIndexSpikes = [4, 5];
        this.rightIndexSpikes = [];

        this.spikeLeft = [];
        this.spikeRight = [];
        this.poolSpikes = [];
        this._initSpikes();
        this._initColliders();
        
        this._moveSpikes();
    }

    _randomSpike(){
        const arrayIndex = [];
        let randomQuantitySpikes = CommonUtils.randomInt(this.minSpikes, this.maxSpikes);
        for(let i = 1; i <= randomQuantitySpikes; i++) {
            let newSpike = CommonUtils.randomInt(1, 10);
            if(!arrayIndex.includes(newSpike)) arrayIndex.push(newSpike);
        }
        return arrayIndex;
    }

    _moveSpikes(){
        if(this.state == 0){
            for(let i = 0; i < this.spikeRight.length; i++){
                if(this.rightIndexSpikes.includes(i)){
                    this.spikeRight[i].x += this.velocity;
                } 
            }
            for(let i = 0; i < this.spikeLeft.length; i++){
                if(this.leftIndexSpikes.includes(i)){
                    this.spikeLeft[i].x +=  this.velocity;
                    if(this.spikeLeft[i].x >= 0){
                        this.state = 1;
                        this.rightIndexSpikes = this._randomSpike();
                        break;
                    }
                }
            }
        }
        if(this.state == 1){
            for(let i = 0; i < this.spikeRight.length; i++){
                if(this.rightIndexSpikes.includes(i)){ 
                    this.spikeRight[i].x -= this.velocity;
                } 
            }
            for(let i = 0; i < this.spikeLeft.length; i++){
                if(this.leftIndexSpikes.includes(i)){
                    this.spikeLeft[i].x -=  this.velocity;  
                    if(this.spikeLeft[i].x <= -this.distance){
                        this.state = 0;
                        this.leftIndexSpikes = this._randomSpike();
                        break;
                    }
                }
            }
        }
    }

    update(){
        this._moveSpikes();
    }

    _initSpikes() {
        let startY_Top = - Game.app.view.height / 2 + Game.app.view.height / 14;
        let startY_Bottom = Game.app.view.height * 2.5 / 7;
     
        this.spikesTop = this._spawnSpikeLine(-280, startY_Top, 7, Math.PI, 1);
        this.spikesBottom = this._spawnSpikeLine(-280, startY_Bottom, 7, 0, 1);
        this.spikeLeft = this._spawnSpikeLine(-Game.app.view.width / 2, startY_Top + 80, 10, Math.PI / 2, 0);
        this.spikeRight = this._spawnSpikeLine(Game.app.view.width / 2, startY_Top + 80, 10, - Math.PI / 2, 0);

        this.spikeLeft.forEach(spike => {
            spike.x -= this.distance;
        })
        this.spikeRight.forEach(spike => {
            spike.x += this.distance;
        })
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

    _spawnSpikeLine(startX, startY, numbers, rotation, dir) {
        // dir = 1 => vẽ hàng, ngược lại vẽ cột
        let spikeLine = new Container();
        let spikes = [];
        const spikeSpacing = 70 * 4 / 3;
 
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
 
    
}