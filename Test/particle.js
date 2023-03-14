"use strict";
import {getRandomInt, getRandomFloat} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(){
        this.x = canvas.clientWidth / 2;
        this.y = canvas.clientHeight / 2;
        this.vx = getRandomFloat(-5, 5);  
        this.vy = getRandomFloat(-5, 5);
        this.red = 255;
        this.green = getRandomFloat(0, 0);
        this.blue = getRandomFloat(0, 0);
        this.alpha = 1;
        this.radius = getRandomFloat(5, 10);
        this.lifeTime = getRandomInt(10, 50);
        this.gravity = 1;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy * this.gravity;
        this.alpha -= 0.01;
        this.lifeTime -= 1;
        this.green += this.lifeTime / 10;
    }

    draw(){
        ctx.fillStyle = "rgba("+this.red+", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "orange";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
        ctx.restore();
    }

    isFinished(){
        if(this.lifeTime <= 0){
            return false;
        }
        return true;
    }
}

export default Particle;