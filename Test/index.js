'use strict';
import Particle from "./particle.js";
import { getCurrentTime } from "../Util/time.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var particles = [];
var seed = 0;

function init(){
    //create(10000);
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

var previous = getCurrentTime();
var lag = 0;
var previousParticles = particles;

//Updates per second
var frameDuration = 1000 / 60;
var t = 0.0;
function loop() {
    window.requestAnimationFrame(loop);

    var now = getCurrentTime();
    // Figure out how long it's been since the last invocation
    var delta = now - previous;
    if(delta > 1000){
        delta = frameDuration;
    }

    // Add the delta to the "accumulator"
    lag += delta;

    // As long as the accumulated time passed is greater than your "timestep"
    while (lag >= frameDuration) {
        create(1000);
        //var deltaTime = Math.min(frameTime, dt);
        previousParticles = particles;
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        document.getElementById("number").innerText = particles.length + "";

        // Subtract one "timestep" from the accumulator
        lag -= frameDuration;
    }
    let lagOffset = lag / frameDuration;
    //console.log(Math.floor(lagOffset*10)/10);
    interpolate(Math.floor(lagOffset*10)/10);
    //console.log(Math.floor(performance.now()/1000));
    // Finally, render the current state to the screen
    draw();

    previous = now;
}

function interpolate(lagOffset){
    if(previousParticles.length >= 0){
        for(var i = 0; i < particles.length; i++){
            particles[i].x * lagOffset + previousParticles[i].x * (1.0 - lagOffset);
            particles[i].y * lagOffset + previousParticles[i].y * (1.0 - lagOffset);
        }
    }
}

window.onload = () => {
    init();
}

export {
    ctx, canvas
};