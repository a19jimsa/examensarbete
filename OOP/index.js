"use strict";
import Particle from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mStartTime = 0;
let mTime = 0;
let mId = 0;
let mFrame = 0;

function init(){
    create(10000000);
    loop();
}

function create(number){
    for(let i = 0; i < number; i++){
        particles.push(new Particle());
    }
}

function counter(){
    mFrame++;
}

function update(){
    for(let i = 0; i < particles.length; i++){
        particles[i].update();
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++){
        particles[i].draw();
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
    let now = performance.now();
    now = now - mStartTime;
    mTime += now + " frametime in ms \n";
    console.log(now);
    counter();
    if(mFrame == 100){
        window.cancelAnimationFrame(mId);
    }else{
        mId = window.requestAnimationFrame(loop);
    }
}


window.onload = () => {
    init();
}

export {
    ctx, canvas
};