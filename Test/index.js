"use strict";
import Particle from "./particle.js";
import store from "../Util/store.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mStartTime = 0;
let mId = 0;
let mFrame = 0;
let data ="data:text/csv;charset=utf-8,\nUpdatetime, Rendertime, Sum, MS";
let mRenderStartTime = 0;

function init(){
    create(2000);
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

var lastCall = performance.now();
var accum = 0;
//Updates per second
var dt = 1000 / 20;
function loop() {
    // Figure out how long it's been since the last invocation
    var delta = performance.now() - lastCall;

    //Cache the current timestep so we can figure out the next delta
    lastCall = performance.now();

    // Add the delta to the "accumulator"
    accum += delta;

    // As long as the accumulated time passed is greater than your "timestep"
    while (accum >= dt) {
        create(100);
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        // Subtract one "timestep" from the accumulator
        accum -= dt;
    }
    // Finally, render the current state to the screen
    draw();
}

window.onload = () => {
    init();
}

export {
    ctx, canvas
};