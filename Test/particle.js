"use strict";
import {getRandomInt, getRandomFloat} from "../Util/random.js";
import {ctx} from "./index.js";

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.vx = getRandomFloat(-30, 30);
        this.vy = getRandomFloat(-30, 30);
        this.blue = getRandomInt(0, 0);
        this.green = getRandomInt(0, 0);
        this.red = getRandomInt(255, 255);
        this.alpha = 1;
        this.radius = getRandomInt(10, 20);
        this.lifeTime = getRandomInt(0, 0);
        this.i = 0;
        this.acceleration = getRandomFloat(1.1, 1.5);
        this.gravity = getRandomFloat(2, 3);
    }

    update(){
        this.vx /= this.acceleration;
        this.vy /= this.acceleration;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        //this.green = 100 + Math.sin(this.i * 0.01) * 100 + this.lifeTime;
        //this.green -= this.lifeTime-this.vy/2;
        //this.i+=0.1;
        this.alpha -= 0.0;
        this.lifeTime += 0.5;
    }

    draw(){
        ctx.fillStyle = "rgba("+ this.red +", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
        ctx.fill();
    }

    isFinished(){
        if(this.lifeTime >= 100){
            return false;
        }
        return true;
    }
}

export default Particle;