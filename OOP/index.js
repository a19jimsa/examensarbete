"use strict";
import Game from "./mygame.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
    let game = new Game(1000);
    game.init();
    game.draw();
}

export default ctx;



