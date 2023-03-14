"use strict";
import getRandomInt from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(){
        this.x = getRandomInt(0, canvas.clientWidth);
        this.y = getRandomInt(0, canvas.clientHeight);
        this.vx = getRandomInt(-5, 5);
        this.vy = getRandomInt(-5, 5);
        this.red = getRandomInt(0, 255);
        this.green = getRandomInt(0, 255);
        this.blue = getRandomInt(0, 255);
        this.alpha = 1;
        this.radius = getRandomInt(5, 10);
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        //this.alpha -= 0.001;
    }

    draw(){
        ctx.fillStyle = "rgba("+this.red+", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
    }
}

export default Particle;