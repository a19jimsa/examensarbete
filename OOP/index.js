"use strict";
import Particle from "./particle.js";
import store from "../Util/store.js";
import {getCurrentTime} from "../Util/time.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Global variables for window
let particles = [];
let mId = 0;
let mFrame = 0;
let data ="data:text/csv;charset=utf-8,\nUpdatetime, Rendertime, Sum, MS";
var previous = performance.now();
var lag = 0;
var previousParticles = [];

//Updates per second
const MS_PER_UPDATE = 1000 / 20;

function init(){
    create(1000);
    var button = document.createElement("button");
    button.innerText = "Start";
    button.addEventListener("click", () => {
        previous = performance.now();
        previousParticles = structuredClone(particles);
        loop();

    }, false);
    document.body.appendChild(button);
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

function draw(lagOffset){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++){
        particles[i].x * lagOffset + previousParticles[i].x * (1.0 - lagOffset);
        particles[i].y * lagOffset + previousParticles[i].y * (1.0 - lagOffset);
        particles[i].draw();
    }
}

function loop() {
    // Figure out how long it's been since the last invocation
    let current = getCurrentTime();
    let elapsed = current - previous;

    //Cache the current timestep so we can figure out the next delta
    previous = current;

    // Add the delta to the "accumulator"
    lag += elapsed;

    const mStartTime = performance.now();
    // As long as the accumulated time passed is greater than your "timestep"
    while (lag >= MS_PER_UPDATE) {
        // Deep copy the particles
        previousParticles = structuredClone(particles);
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        // Subtract one "timestep" from the accumulator
        lag -= MS_PER_UPDATE;
    }

    let now = performance.now();
    let elapsedUpdateTime = now - mStartTime;
    //console.log(Math.floor(performance.now()/1000));

    const mRenderStartTime = performance.now();

    // Finally, render the current state to the screen
    draw(lag / MS_PER_UPDATE);

    //Save the elapsed time
    now = performance.now();
    const elapsedRenderTime = now - mRenderStartTime;
    const sum = elapsedRenderTime + elapsedUpdateTime;
    data += ",\n" + elapsedUpdateTime + ", " + elapsedRenderTime + ", " + sum;

    mFrame++;
    if(mFrame === 1000){
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