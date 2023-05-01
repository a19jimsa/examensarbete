"use strict";
import Particle from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mStartTime = 0;
let mId = 0;
let mFrame = 0;
let data ="data:text/csv;charset=utf-8,\nUpdatetime, Rendertime, Sum, MS";
let mRenderStartTime = 0;
var lastCall = 0;

function init(){
    create(20000);
    lastCall = performance.now();
    window.requestAnimationFrame(loop);
}

function create(number){
    for(let i = 0; i < number; i++){
        Math.setSeed(i);
        particles.push(new Particle());
    }
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

var accum = 0;
//Updates per second
var dt = 1000 / 20;
function loop() {

    update();
    
    // Finally, render the current state to the screen
    draw();
    console.log(Math.floor(performance.now()/1000));
    window.requestAnimationFrame(loop);
}

window.onload = () => {
    init();
}

export {
    ctx, canvas
};