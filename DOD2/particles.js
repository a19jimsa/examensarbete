"use strict";
import {getRandomFloat, getRandomInt} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particles{
    constructor(number){
        this.number = number;
    }

    init(){
        this.x = new Float32Array(this.number);
        this.y = new Float32Array(this.number);
        this.vx = new Float32Array(this.number);
        this.vy = new Float32Array(this.number);
        this.red = new Float32Array(this.number);
        this.blue = new Float32Array(this.number);
        this.green = new Float32Array(this.number);
        this.radius = new Float32Array(this.number);

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

Particles.prototype.update = function(){
    for(let i = 0; i < this.number; i++){
        this.x[i] += this.vx[i];
    }
    for(let i = 0; i < this.number; i++){
        this.y[i] += this.vy[i];
    }
}

Particles.prototype.draw = function(){
    for(let i = 0; i < this.number; i++){
        ctx.fillStyle = "rgba("+ this.red[i] +", " + this.green[i] +", "+ this.blue[i] + ", "+ 0.8 +")";
        ctx.fillRect(this.x[i], this.y[i], this.radius[i], this.radius[i]);
    }
}

export default Particles;