"use strict";
import {getRandomFloat, getRandomInt} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(number){
        this.number = number;
    }

    init(){
        Math.setSeed(10);
        this.x = new Int16Array(this.number);
        this.y = new Int16Array(this.number);
        this.vx = new Int8Array(this.number);
        this.vy = new Int8Array(this.number);
        this.alpha = new Float32Array(this.number);
        this.red = new Uint8Array(this.number);
        this.blue = new Uint8Array(this.number);
        this.green = new Uint8Array(this.number);
        this.radius = new Int8Array(this.number);
        this.lifeTime = new Int8Array(this.number);

        for(let i = 0; i < this.number; i++){
            this.x[i] = getRandomInt(0, canvas.clientWidth);
            this.y[i] = getRandomInt(0, canvas.clientHeight);
            this.vx[i] = getRandomInt(-5, 5);
            this.vy[i] = getRandomInt(-5, 5);
            this.red[i] = getRandomInt(0, 255);
            this.green[i] = getRandomInt(0, 255);
            this.blue[i] = getRandomInt(0, 255);
            this.radius[i] = getRandomInt(5, 10);
        }
    }

    update(){
        for(let i = 0; i < this.number; i++){
            this.x[i] += this.vx[i];
        }
        for(let i = 0; i < this.number; i++){
            this.y[i] += this.vy[i];
        }
    }

    draw(){
        for(let i = 0; i < this.number; i++){
            ctx.fillStyle = "rgba("+ this.red[i] +", " + this.green[i] +", "+ this.blue[i] + ", "+ 0.5 +")";
            ctx.fillRect(this.x[i], this.y[i], this.radius[i], this.radius[i]);
        }
    }
}

export default Particle;