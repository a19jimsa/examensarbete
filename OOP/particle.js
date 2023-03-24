"use strict";
import {getRandomInt, getRandomFloat} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(){
        this.x = getRandomFloat(0, canvas.clientWidth);
        this.y = getRandomFloat(0, canvas.clientHeight);
        this.vx = getRandomFloat(-1, 1);
        this.vy = getRandomFloat(-1, 1);
        this.red = getRandomFloat(0, 255);
        this.green = getRandomFloat(0, 255);
        this.blue = getRandomFloat(0, 255);
        this.radius = getRandomFloat(5, 10);
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(){
        ctx.fillStyle = "rgba("+this.red+", " + this.green +", " + this.blue +", " + 0.8 + ")";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
    }
}

export default Particle;