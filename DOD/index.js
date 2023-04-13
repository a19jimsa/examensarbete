"use strict";
import Particles from "./particles.js";
import store from "../Util/store.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles;
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
    particles = new Particles(number);
    particles.init();
}

function update(){
    particles.update();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.draw();
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

    mStartTime = performance.now();
    // As long as the accumulated time passed is greater than your "timestep"
    while (accum >= dt) {
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        console.log(Math.floor(performance.now()/1000));
        // Subtract one "timestep" from the accumulator
        accum -= dt;
    }
    let now = performance.now();
    let elapsedUpdateTime = now - mStartTime;
    //console.log(Math.floor(performance.now()/1000));

    mRenderStartTime = performance.now();
    // Finally, render the current state to the screen
    draw();

    //Save the elapsed time
    now = performance.now();
    let elapsedRenderTime = now - mRenderStartTime;
    let sum = elapsedRenderTime + elapsedUpdateTime;
    data += ",\n" + elapsedUpdateTime + ", " + elapsedRenderTime + ", " + sum;
    mFrame++;
    if(mFrame == 1000){
        window.cancelAnimationFrame(mId);
        store(data, "DOD");
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