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
        this.distance = (70 ) * Math.sqrt(3) / 2;
        this.minSpikes = 2;
        this.maxSpikes = 5;
        this.leftIndexSpikes = [4, 5];
        this.rightIndexSpikes = [];

        this.spikeLeft = [];
        this.spikeRight = [];
        this.poolSpikes = [];
        this._initSpikes();
    }
    // manager
    _randomSpike(limitSpike) {
        this.minSpikes = limitSpike.minSpikes;
        this.maxSpikes = limitSpike.maxSpikes;
        const arrayIndex = [];
        let randomQuantitySpikes = CommonUtils.randomInt(this.minSpikes, this.maxSpikes);
        while(arrayIndex.length < randomQuantitySpikes) {
            let newSpike = CommonUtils.randomInt(0, 9);
            if (!arrayIndex.includes(newSpike)) arrayIndex.push(newSpike);
        }
        return arrayIndex;
    }

    moveSpikes(state, limitSpike) {
        this.state = state;
        if (this.state == -1) {
            this.spikeRight.forEach((spike, index) => {
                if (this.rightIndexSpikes.includes(index)) {
                    const target = { x: this.distance, y: spike.y };
                    this._movebyTween(spike, target);
                }
            })
            this.spikeLeft.forEach((spike, index) => {
                if (this.leftIndexSpikes.includes(index)) {
                    const target = { x: 0, y: spike.y };
                    this._movebyTween(spike, target);
                }
            })
            this.rightIndexSpikes = this._randomSpike(limitSpike);
        }
        if (this.state == 1) {
            this.spikeRight.forEach((spike, index) => {
                if (this.rightIndexSpikes.includes(index)) {
                    const target = { x: 0, y: spike.y };
                    this._movebyTween(spike, target);
                }
            })
            this.spikeLeft.forEach((spike, index) => {
                if (this.leftIndexSpikes.includes(index)) {
                    const target = { x: -this.distance, y: spike.y };
                    this._movebyTween(spike, target);
                }
            })
            this.leftIndexSpikes = this._randomSpike(limitSpike);
        }
    }

    moveSpikesHardMode(state, limitSpike){
        this.state = state;
        this.deviatedY = 50 ;
        if(this.state == -1){
            this.spikeRight.forEach((spike, index) => {
                if(this.rightIndexSpikes.includes(index)){
                    const target = {x: this.distance, y: spike.y - this.deviatedY};
                    this._hardModeMovebyTween(spike, target);
                } 
            })
            this.spikeLeft.forEach((spike, index) => {
                spike.x = this.constPositionLeftX[index];
                spike.y = this.constPositionY[index];
            })
            this.spikeLeft.forEach((spike, index) => {
                if(this.leftIndexSpikes.includes(index)){
                    const target = {x: 0, y: spike.y - this.deviatedY};
                    this._hardModeMovebyTween(spike, target);
                } 
            })
            this.rightIndexSpikes = this._randomSpike(limitSpike);
        }
        if(this.state == 1){
            this.spikeRight.forEach((spike, index) => {
                spike.x = this.constPositionRightX[index];
                spike.y = this.constPositionY[index];
            })
            this.spikeRight.forEach((spike, index) => {
                if(this.rightIndexSpikes.includes(index)){
                    const target = {x: 0, y: spike.y + this.deviatedY};
                    this._hardModeMovebyTween(spike, target);
                } 
            })
            this.spikeLeft.forEach((spike, index) => {
                if(this.leftIndexSpikes.includes(index)){
                    const target = {x: -this.distance, y: spike.y + this.deviatedY};
                    this._hardModeMovebyTween(spike, target);
                } 
            })
            this.leftIndexSpikes = this._randomSpike(limitSpike);
        }
    } 
    // r
    _movebyTween(spike, position) {
        this.tween = new TWEEN.Tween(spike)
            .to({ x: position.x, y: position.y }, 500);
        this.tween.start();
    }
    // r
    _hardModeMovebyTween(spike, target, direction){
        spike.tween1 = new TWEEN.Tween(spike)
        .to(target, 300)
        .onComplete(() => {
            let newtarget;
            if(direction == 0) newtarget = {x: target.x, y: target.y + 70 };
            else newtarget = {x: target.x, y: target.y - 70 };
            spike.tween2 = new TWEEN.Tween(spike)
            .to(newtarget, 700)
            .yoyo(true)
            .repeat(Infinity)
            .start();  
        })
        spike.tween1.start();
    }
    // manager
    _initSpikes() {
        let startY_Top = - 525 ;
        let startY_Bottom = 434 ;

        this.spikesTop = this._spawnSpikeLine(-280 , startY_Top, 7, Math.PI, 1);
        this.spikesBottom = this._spawnSpikeLine(-280 , startY_Bottom, 7, 0, 1);
        this.spikeLeft = this._spawnSpikeLine(-Game.app.view.width / 2 + 24 , startY_Top + 80 , 10, Math.PI / 2, 0);
        this.spikeRight = this._spawnSpikeLine(Game.app.view.width / 2 - 24 , startY_Top + 80 , 10, - Math.PI / 2, 0);

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
    }
    // manager
    _addPoolSpike(array) {
        array.forEach(spike => {
            this.poolSpikes.push(spike);
        })
    }
    // manager
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
            spike.changeColor(color);
        })
    }
    // move
    onReset() {
        this.changeColor("FFFFFF");
        // không tắt được cái spike di chuyển lên xuống liên tục :((
 
        this.spikeLeft.forEach((spike, index) => {
            if(this.leftIndexSpikes.includes(index)){
                if(spike.tween1){
                    const target = {x: -this.distance, y: spike.y + this.deviatedY};
                    this._hardModeMovebyTween(spike, target);
                } 
                spike.x = this.constPositionLeftX[index];
            } 
        })
        this.spikeRight.forEach((spike, index) => {
            if(this.rightIndexSpikes.includes(index)){
                if(spike.tween1){
                    const target = {x: this.distance, y: spike.y - this.deviatedY};
                    this._hardModeMovebyTween(spike, target);
                } 
                spike.x = this.constPositionRightX[index];
            } 
        })

        // manager
        this.leftIndexSpikes = [4, 5];
        this.rightIndexSpikes = [];
    }
}