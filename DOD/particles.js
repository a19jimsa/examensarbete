"use strict";
import {getRandomFloat, getRandomInt} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particles{
    constructor(number){
        this.number = number;
    }

    init(){
        this.x = new Array(this.number);
        this.y = new Array(this.number);
        this.vx = new Array(this.number);
        this.vy = new Array(this.number);
        this.red = new Array(this.number);
        this.blue = new Array(this.number);
        this.green = new Array(this.number);
        this.radius = new Array(this.number);

        for(let i = 0; i < this.number; i++){
            Math.setSeed(i);
            this.x[i] = getRandomFloat(0, canvas.clientWidth);
            this.y[i] = getRandomFloat(0, canvas.clientHeight);
            this.vx[i] = getRandomFloat(-1, 1);
            this.vy[i] = getRandomFloat(-1, 1);
            this.red[i] = getRandomFloat(0, 255);
            this.green[i] = getRandomFloat(0, 255);
            this.blue[i] = getRandomFloat(0, 255);
            this.radius[i] = getRandomFloat(5, 10);
        }
    }

}

Particle.prototype.update = function(){
    for(let i = 0; i < this.number; i++){
        this.x[i] += this.vx[i];
    }
    for(let i = 0; i < this.number; i++){
        this.y[i] += this.vy[i];
    }
}

Particle.prototype.draw = function(){
    for(let i = 0; i < this.number; i++){
        ctx.fillStyle = "rgba("+ this.red[i] +", " + this.green[i] +", "+ this.blue[i] + ", "+ 0.8 +")";
        ctx.fillRect(this.x[i], this.y[i], this.radius[i], this.radius[i]);
    }
}

export default Particle;