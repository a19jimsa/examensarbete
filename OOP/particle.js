"use strict";
import getRandomInt from "./random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(){
        this.x = getRandomInt(0, canvas.clientWidth);
        this.y = getRandomInt(0, canvas.clientHeight);
        this.vx = getRandomInt(-1, 1);
        this.vy = getRandomInt(-1, 1);
        this.red = getRandomInt(0, 255);
        this.green = getRandomInt(0,255);
        this.blue = getRandomInt(0,255);
        this.radius = getRandomInt(1, 3);
        this.alpha = 1;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;
    }

    draw(){
        ctx.fillStyle = "rgba("+this.red+", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    isFinished(){
        if(this.alpha > 0){
            return true;
        }
        return false;
    }
}

export default Particle;