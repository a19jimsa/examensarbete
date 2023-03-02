"use strict";

import Particle from "./particle.js";

let particles = [];

class Game{
    constructor(nrParticles){
        this.number = nrParticles;
        this.init();
    }

    init(){
        for(let i = 0; i < this.number; i++){
            particles.push(new Particle(10+i,10+i,10,10));
        }
    }

    draw(){
        particles.forEach(element => element.draw());   
    }
}




export default Game;
