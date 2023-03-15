"use strict";
import Particle from "./particle.js";
import store from "../Util/store.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles;
let mStartTime = 0;
let mId = 0;
let mFrame = 0;
let data ="data:text/text;charset=utf-8,\nMS";

function init(){
    Math.setSeed(10);
    create(200000);
    window.requestAnimationFrame(loop);
}

function create(number){
    particles = new Particle(number);
    particles.init();
}

function update(){
    particles.update();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.draw();
}

function loop(){
    mStartTime = performance.now();
    update();
    draw();
    let now = performance.now();
    now = now - mStartTime;
    data += ",\n" + now;
    mFrame++;
    if(mFrame == 100){
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