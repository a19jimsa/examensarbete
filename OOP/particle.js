"use strict";
import ctx from "./index.js";

class Particle{
    constructor(x, y, color, radius){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
    }

    update(){
        this.x += 1;
        this.y += 1;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default Particle;