'use strict';
import Particle from "./particle.js";
import { getCurrentTime } from "../Util/time.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var particles = [];
var seed = 0;

function init(){
    window.requestAnimationFrame(loop);
}

function create(number){
    for(let i = 0; i < number; i++){
        Math.setSeed(seed);
        seed++;
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

var currentTime = getCurrentTime();
var accum = 0;
//Updates per second
var dt = 1000 / 60;
var t = 0.0;
function loop() {
    
    var newTime = getCurrentTime();
    // Figure out how long it's been since the last invocation
    var frameTime = newTime - currentTime;

    //Cache the current timestep so we can figure out the next delta
    currentTime = newTime;

    // Add the delta to the "accumulator"
    //accum += delta;

    // As long as the accumulated time passed is greater than your "timestep"
    while (frameTime > 0.0) {
        var deltaTime = Math.min(frameTime, dt);
        create(10);
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        frameTime -= deltaTime;
        console.log(Math.floor(performance.now()/1000));
        // Subtract one "timestep" from the accumulator
        //accum -= dt;
        t += deltaTime;
    }
    //console.log(Math.floor(performance.now()/1000));
    // Finally, render the current state to the screen
    draw();
    window.requestAnimationFrame(loop);
}

window.onload = () => {
    init();
}

export {
    ctx, canvas, dt
};