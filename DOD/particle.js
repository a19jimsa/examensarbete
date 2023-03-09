"use strict";
import getRandomInt from "./random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(number){
        this.number = number;
        this.x = new Array(number);
        this.y = new Array(number);
        this.vx = new Array(number);
        this.vy = new Array(number);
        this.alpha = new Array(number);
        this.red = new Array(number);
        this.blue = new Array(number);
        this.green = new Array(number);
    }

    init(){
        for(let i = 0; i < this.number; i++){
            this.x[i] = getRandomInt(0, canvas.clientWidth);
            this.y[i] = getRandomInt(0, canvas.clientHeight);
            this.vx[i] = getRandomInt(-1, 1);
            this.vy[i] = getRandomInt(-1, 1);
            this.red[i] = getRandomInt(0, 255);
            this.green[i] = getRandomInt(0, 255);
            this.blue[i] = getRandomInt(0, 255);
            this.alpha[i] = 1;
        }
    }

    update(){
        for(let i = 0; i < this.number; i++){
            this.x[i] += this.vx[i];
        }
        for(let i = 0; i < this.number; i++){
            this.y[i] += this.vy[i];
        }
        for(let i = 0; i < this.number; i++){
            this.alpha[i] -= 0.01;
        }
    }

    draw(){
        for(let i = 0; i < this.number; i++){
            ctx.fillStyle = "rgba("+ this.red[i] +", " + this.green[i] +", "+ this.blue[i] + ", "+ this.alpha[i] +")";
            ctx.beginPath();
            ctx.arc(this.x[i], this.y[i], 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    isFinished(id){
        if(this.alpha[id] > 0){
            return true;
        }
        return false;
    }
}

export default Particle;