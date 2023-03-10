"use strict";
import Particle from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles;
let mStartTime = 0;
let mTime = 0;
let mId = 0;
let mFrame = 0;

function init(){
    create(100);
    loop();
}

function create(number){
    particles = new Particle(number);
    particles.init();
}

function counter(){
    mFrame++;
}

function update(){
    particles.update();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.draw();
}

function store(){
    
}

function loop(){
    mStartTime = performance.now();
    update();
    let now = performance.now();
    now = now - mStartTime;
    console.log(now);
    draw();
    counter();
    if(mFrame == 100){
        window.cancelAnimationFrame(mId);
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