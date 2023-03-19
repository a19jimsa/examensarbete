"use strict";
import {getRandomInt, getRandomFloat} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(){
        this.x = canvas.clientWidth / 2;
        this.y = canvas.clientHeight + 10;
        this.vx = getRandomFloat(-3, 3);  
        this.vy = getRandomFloat(-1, -20);
        this.blue = getRandomInt(0, 0);;
        this.green = getRandomInt(255, 255);
        this.red = 255;
        this.alpha = 1;
        this.radius = getRandomInt(5, 20);
        this.lifeTime = getRandomInt(0, 0);
        this.i = 0;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        //this.green = 100 + Math.sin(this.i * 0.01) * 100 + this.lifeTime;
        this.green = 5000 / this.lifeTime;
        this.i++;
        this.lifeTime += 0.5;
    }

    draw(){
        ctx.strokeStyle = "rgba("+ this.red +", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    isFinished(){
        if(this.lifeTime >= 100){
            return false;
        }
        return true;
    }
}

export default Particle;