"use strict";

const kUPS = 60;
const kMPF = 1000;

let mPrevTime;
let mLagTime;
let mCurrentScene = null;
let mLoopRunning = false;
let mFrameID = -1;

function loopOnce(){
    if(mLoopRunning){
        mFrameID = requestAnimationFrame(loopOnce);
        let currentTime = performance.now();
        let elapsedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elapsedTime;
        mCurrentScene.draw();
        while((mLagTime > kMPF ) && mLoopRunning){
            mCurrentScene.update();
            mLagTime -= kMPF;
        } 
    }
}

function start(scene){
    mCurrentScene = scene;
    mCurrentScene.init();
    mPrevTime = performance.now();
    mLagTime = 0.0;
    mLoopRunning = true;
    mFrameID = requestAnimationFrame(loopOnce);
}

function stop(){
    mLoopRunning = false;
    cancelAnimationFrame(mFrameID);
}

export {start, stop};