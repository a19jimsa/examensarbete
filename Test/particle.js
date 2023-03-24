"use strict";
import {getRandomInt, getRandomFloat} from "../Util/random.js";
import {ctx, canvas} from "./index.js";

class Particle{
    constructor(){
        this.x = canvas.clientWidth / 2;
        this.y = canvas.clientHeight + 10;
        this.vx = getRandomFloat(-5, 5);  
        this.vy = getRandomFloat(-1, -20);
        this.blue = getRandomInt(0, 0);;
        this.green = getRandomInt(255, 255);
        this.red = 255;
        this.alpha = 1;
        this.radius = getRandomInt(5, 20);
        this.lifeTime = getRandomInt(0, 0);
        this.i = 0;
        this.displayX = 0;
        this.displayY = 0;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        //this.green = 100 + Math.sin(this.i * 0.01) * 100 + this.lifeTime;
        this.green -= this.lifeTime-this.vy/3;
        this.i++;
        this.lifeTime += 0.5;
    }

    interpolate(lagOffset){
        // use the lagOffset and the sprites previous x/y pos to interpolate
      // the position
      this.displayX = (typeof this.previousX !== "undefined") ? 
      (this.x - this.previousX) * lagOffset + this.previousX : this.x;
    this.displayY = (typeof this.previousY !== "undefined") ? 
      (this.y - this.previousY) * lagOffset + this.previousY : this.y;
    }

    draw(lagOffset){
        this.interpolate(lagOffset);
        ctx.fillStyle = "rgba("+ this.red +", " + this.green +", " + this.blue +", " + this.alpha + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
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