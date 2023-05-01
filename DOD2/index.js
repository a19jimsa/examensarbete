"use strict";
import Particles from "./particles.js";
import store from "../Util/store.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Global variables for window
let particles = [];
let mId = 0;
let mFrame = 0;
let data ="data:text/csv;charset=utf-8,\nUpdatetime, Rendertime, Sum, MS";
let previous = 0;
let lag = 0;
let amount = 0;
let iterations = 0; 

//Updates per second
const MS_PER_UPDATE = 1000 / 20;

function init(){
    amount = window.localStorage.getItem("amount");
    iterations = window.localStorage.getItem("iterations");
    if(amount == null){
        amount = 1000;
    }
    if(iterations == null){
        iterations = 0;
    }
    console.log(amount);
    create(100);
    var button = document.createElement("button");
    button.innerText = "Start";
    button.addEventListener("click", () => {
        previous = performance.now();
        loop();

    }, false);
    document.body.appendChild(button);
    button.click();
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

function loop() {
    // Figure out how long it's been since the last invocation
    const current = performance.now();
    const elapsed = current - previous;

    //Cache the current timestep so we can figure out the next delta
    previous = current;

    // Add the delta to the "accumulator"
    lag += elapsed;

    const mStartTime = performance.now();
    // As long as the accumulated time passed is greater than your "timestep"
    while (lag >= MS_PER_UPDATE) {
        // Update the game's internal state (i.e. physics, logic, etc)
        update();
        // Subtract one "timestep" from the accumulator
        lag -= MS_PER_UPDATE;
    }

    let now = performance.now();
    let elapsedUpdateTime = now - mStartTime;
    const mRenderStartTime = performance.now();

    // Finally, render the current state to the screen
    draw();
    console.log(Math.floor(performance.now()/1000));

    //Save the elapsed time
    now = performance.now();
    const elapsedRenderTime = now - mRenderStartTime;
    const sum = elapsedRenderTime + elapsedUpdateTime;
    data += ",\n" + elapsedUpdateTime + ", " + elapsedRenderTime + ", " + sum + ", " + window.performance.memory.usedJSHeapSize;
    //Add frame
    mFrame++;
    checkFrame();
}

function checkFrame(){
    if(mFrame === 1000){
        let counter = window.localStorage.getItem("counter");
        if(counter == null){
            counter = 0;
        }
        counter++;
        window.localStorage.setItem("counter", counter);
        window.cancelAnimationFrame(mId);
        if(counter <= 10){
            window.location.reload();
        }else if(counter <= 20){
            store(data, amount + "DOD2");
            window.location.reload();
        }else{
            //Increase after 10 succesful test
            amount = Number(amount) + 20000;
            window.localStorage.setItem("counter", 0);
            window.localStorage.setItem("amount", amount);
            iterations++;
            if(iterations < 15){
                window.localStorage.setItem("iterations", iterations);
                window.location.reload();
            }else{
                window.localStorage.clear();
                alert("Done!");
            }
            
        }
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