"use strict";
import Particle from "./particle.js";
import store from "../Util/store.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mStartTime = 0;
let mId = 0;
let mFrame = 0;
let data ="data:text/csv;charset=utf-8,\nMS";
let seed = 0;

function init(){
    create(100000);
    loop();
}

function create(number){
    for(let i = 0; i < number; i++){
        seed++;
        Math.setSeed(seed);
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
    for(let i = 0; i < particles.length; i++){
        let particle = particles[i];
        if(particle.lifeTime < 0){
            seed++;
            Math.setSeed(seed);
            particles[i] = new Particle();
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++){
        particles[i].draw();
    }
}

function loop(){
    mStartTime = performance.now();
    update();
    draw();
    let now = performance.now();
    now = now - mStartTime;
    data += ",\n" + now;
    mFrame++;
    if(mFrame == 1000){
        window.cancelAnimationFrame(mId);
        store(data, "OOP");
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