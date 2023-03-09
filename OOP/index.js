"use strict";
import Particle from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

 let particles = [];
 let mStartTime = 0;
 let mTime = 0;
 let mId = 0;

function init(){
    create(1000000);
    loop();
}

function create(number){
    for(let i = 0; i < number; i++){
        particles.push(new Particle());
    }
}

function destroy(){
    particles = particles.filter(element => element.isFinished());
}

function update(){
    particles.forEach(element => element.update());
    destroy();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let particle of particles){
        particle.draw();
    }
}

function store(){
    let now = performance.now();
    now = now - mStartTime;
    mTime += now + " frametime in ms \n";
    window.localStorage.setItem("frame", mTime);
    console.log(now);
}

function loop(){
    mStartTime = performance.now();
    update();
    draw();
    store();
    if(particles.length == 0){
        stop();
    }else{
        mId = window.requestAnimationFrame(loop);
    }
}

function stop(){
    window.cancelAnimationFrame(mId);
    alert("Simulation has stopped!");
}

window.onload = () => {
    init();
}

export {
    ctx, canvas
};