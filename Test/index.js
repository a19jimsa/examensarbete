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

var currentTime = getCurrentTime();
var lag = 0;
var currentParticles = particles;;

//Updates per second
var frameDuration = 1000 / 20;
var t = 0.0;
function loop() {
    var newTime = getCurrentTime();
    // Figure out how long it's been since the last invocation
    var delta = newTime - currentTime;
    if(delta > 1000){
        delta = frameDuration;
    }

    // Add the delta to the "accumulator"
    lag += delta;

    // As long as the accumulated time passed is greater than your "timestep"
    while (lag >= frameDuration) {
        create(1000);
        //var deltaTime = Math.min(frameTime, dt);
        currentParticles = particles;
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        document.getElementById("number").innerText = particles.length + "";
        console.log(Math.floor(performance.now() / 1000));
        // Subtract one "timestep" from the accumulator
        lag -= frameDuration;
        //accum -= dt;
        //t += dt;
    }
    let lagOffset = lag / frameDuration;
    console.log(lagOffset);
    interpolate(lagOffset);
    //console.log(Math.floor(performance.now()/1000));
    // Finally, render the current state to the screen
    draw();
    window.requestAnimationFrame(loop);
}

function interpolate(lagOffset){
    if(currentParticles.length <= 0){
        for(var i = 0; i < particles.length; i++){
            (particles[i].x - currentParticles[i].x) * lagOffset + this.particles[i].x;
            (particles[i].y - currentParticles[i].y) * lagOffset + this.particles[i].y;
        }
    }
}

window.onload = () => {
    init();
}

export {
    ctx, canvas
};