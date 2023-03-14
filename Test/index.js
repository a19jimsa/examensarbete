'use strict';
import Particle from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var particles = [];

function init(){
    loop();
}

function create(number){
    for(let i = 0; i < number; i++){
        particles.push(new Particle());
    }
    
}

function update(){
    for(let i = 0; i < particles.length; i++){
        particles[i].update();
    }
    particles = particles.filter(element => element.isFinished());
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++){
        particles[i].draw();
    }
}

function loop(){
    create(100);
    update();
    document.getElementById("number").innerText = particles.length + "";
    draw();
    window.requestAnimationFrame(loop);
}


window.onload = () => {
    init();
}

export {
    ctx, canvas
};