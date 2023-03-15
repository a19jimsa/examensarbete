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
        this.green = getRandomInt(0, 0);
        this.blue = getRandomInt(0, 0);
        this.alpha = 1;
        this.radius = getRandomInt(5, 10);
        this.lifeTime = getRandomInt(10, 100);
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;
        this.lifeTime -= 1;
        this.green += this.lifeTime / 10;
    }

    draw(){
        ctx.fillStyle = "rgba("+this.red+", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "orange";
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
    }

    isFinished(){
        if(this.lifeTime <= 0){
            return false;
        }
        return true;
    }
}

export default Particle;