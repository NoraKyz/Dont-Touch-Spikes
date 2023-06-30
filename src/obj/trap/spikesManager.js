import { Container } from "pixi.js";
import { Spike } from "./spike";
import { Game } from "../../game";
import { Collider } from "../physics/collider";
import { CommonUtils } from "../../commonUtils";
import * as TWEEN from '@tweenjs/tween.js'  

export class SpikesManager extends Container {
    constructor() {
        super();
        this.state = 0;
        this.distance = (70 / Game.ratio) * Math.sqrt(3) / 2;
        this.velocity = this.distance / 30;
        this.minSpikes = 2;
        this.maxSpikes = 5;
        this.leftIndexSpikes = [4, 5];
        this.rightIndexSpikes = [];

        this.spikeLeft = [];
        this.spikeRight = [];
        this.poolSpikes = [];
        this._initSpikes();
        this._initColliders();
    }

    _randomSpike(limitSpike){
        this.minSpikes = limitSpike.minSpikes;
        this.maxSpikes = limitSpike.maxSpikes;
        const arrayIndex = [];
        let randomQuantitySpikes = CommonUtils.randomInt(this.minSpikes, this.maxSpikes);
        for(let i = 1; i <= randomQuantitySpikes; i++) {
            let newSpike = CommonUtils.randomInt(2, 9);
            if(!arrayIndex.includes(newSpike)) arrayIndex.push(newSpike);
        }
        return arrayIndex;
    }

    moveSpikes(state, limitSpike){
        this.state = state;
        if(this.state == 0){
            this.spikeRight.forEach((spike, index) => {
                if(this.rightIndexSpikes.includes(index)){
                    const target = {x: this.distance, y: spike.y};
                    this._movebyTween(spike, target);
                } 
            })
            this.spikeLeft.forEach((spike, index) => {
                if(this.leftIndexSpikes.includes(index)){
                    const target = {x: 0, y: spike.y};
                    this._movebyTween(spike, target);
                } 
            })
            this.rightIndexSpikes = this._randomSpike(limitSpike);
        }
        if(this.state == 1){
            this.spikeRight.forEach((spike, index) => {
                if(this.rightIndexSpikes.includes(index)){
                    const target = {x: 0, y: spike.y};
                    this._movebyTween(spike, target);
                } 
            })
            this.spikeLeft.forEach((spike, index) => {
                if(this.leftIndexSpikes.includes(index)){
                    const target = {x: -this.distance, y: spike.y};
                    this._movebyTween(spike, target);
                } 
            })
            this.leftIndexSpikes = this._randomSpike(limitSpike);
        }
    }
     
    _movebyTween(spike, position) {
        this.tween = new TWEEN.Tween(spike)
        .to({x: position.x, y: position.y}, 500);
        this.tween.start();
    }

    update(){
        TWEEN.update();
    }

    _initSpikes() {
        let startY_Top = - Game.app.view.height / 2 + Game.app.view.height / 14;
        let startY_Bottom = Game.app.view.height * 2.5 / 7;
     
        this.spikesTop = this._spawnSpikeLine(-280 / Game.ratio, startY_Top, 7, Math.PI, 1);
        this.spikesBottom = this._spawnSpikeLine(-280 / Game.ratio, startY_Bottom, 7, 0, 1);
        this.spikeLeft = this._spawnSpikeLine(-Game.app.view.width / 2, startY_Top + 80 / Game.ratio, 10, Math.PI / 2, 0);
        this.spikeRight = this._spawnSpikeLine(Game.app.view.width / 2, startY_Top + 80 / Game.ratio, 10, - Math.PI / 2, 0);

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
        let colliderRadious = 30 / Game.ratio;
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
        const spikeSpacing = (70 / Game.ratio) * 4 / 3;
 
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
 
    changeColor(color){
        this.poolSpikes.forEach(spike => {
            spike.changeColor(color);
        })
    }

    onReset(){
        this.changeColor("FFFFFF");

        this.spikeRight.forEach(spike => {
            spike.position.x = this.distance;
        })

        this.spikeLeft.forEach(spike => {
            spike.position.x = -this.distance;
        })
    }
}