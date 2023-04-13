"use strict";
import Particles from "./particles.js";
import store from "../Util/store.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles;
let mId = 0;
let mFrame = 0;
let data ="data:text/csv;charset=utf-8,\nUpdatetime, Rendertime, Sum, MS";
var mLastCall = performance.now();
var mAccum = 0;
//Updates per second
var mUPS = 1000 / 60;
var previousParticles;

function init(){
    create(20000);
    previousParticles = particles;
    loop();
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
    particles.draw(arguments[0], arguments[1]);
}

function loop() {
    // Figure out how long it's been since the last invocation
    const delta = performance.now() - mLastCall;

    //Cache the current timestep so we can figure out the next delta
    mLastCall = performance.now();

    // Add the delta to the "accumulator"
    mAccum += delta;

    const mStartTime = performance.now();
    // As long as the accumulated time passed is greater than your "timestep"
    while (mAccum >= mUPS) {
        // Get all particles before updating them for interpolate.
        previousParticles = particles;
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        // Subtract one "timestep" from the accumulator
        mAccum -= mUPS;
        
    }
    let now = performance.now();
    console.log(now - mStartTime);
    const elapsedUpdateTime = now - mStartTime;

    const mRenderStartTime = performance.now();

    const lagOffset = mAccum / mUPS;

    // Finally, render the current state to the screen
    draw(lagOffset, previousParticles);

    //Save the elapsed time
    now = performance.now();
    const elapsedRenderTime = now - mRenderStartTime;
    const sum = elapsedRenderTime + elapsedUpdateTime;
    data += ",\n" + elapsedUpdateTime + ", " + elapsedRenderTime + ", " + sum;
    mFrame++;
    if(mFrame >= 1000){
        window.cancelAnimationFrame(mId);
        store(data, "DOD2");
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