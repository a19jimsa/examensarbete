"use strict";
import { getRandomFloat, getRandomInt } from "../Util/random.js";
import { ctx, canvas } from "./index.js";

class Particles {
  constructor(number) {
    this.number = number;
  }

  init() {
    this.x = new Array(this.number);
    this.y = new Array(this.number);
    this.vx = new Array(this.number);
    this.vy = new Array(this.number);
    this.red = new Array(this.number);
    this.blue = new Array(this.number);
    this.green = new Array(this.number);
    this.radius = new Array(this.number);

    for (let i = 0; i < this.number; i++) {
      Math.setSeed(i);
      this.x[i] = getRandomFloat(0, canvas.clientWidth);
      this.y[i] = getRandomFloat(0, canvas.clientHeight);
      this.vx[i] = getRandomFloat(-1, 1);
      this.vy[i] = getRandomFloat(-1, 1);
      this.red[i] = getRandomInt(0, 255);
      this.green[i] = getRandomInt(0, 255);
      this.blue[i] = getRandomInt(0, 255);
      this.radius[i] = getRandomInt(1, 10);
    }
  }
}

Particles.prototype.update = function () {
  let dx = 0, dy = 0, dist = 0;
  for (let i = 0; i < this.number; i++) {
    dx = 640 - this.x[i];
    dy = 480 - this.y[i];
    dist = Math.sqrt(dx * dx + dy * dy);
    this.vx[i] += dx / dist; // Gravitational force
    this.vy[i] += dy / dist;
    this.x[i] += this.vx[i] * 0.1; // Euler integration
    this.y[i] += this.vy[i] * 0.1;
  }
};

Particles.prototype.draw = function () {
  for (let i = 0; i < this.number; i++) {
    ctx.fillStyle =
      "rgba(" +
      this.red[i] +
      ", " +
      this.green[i] +
      ", " +
      this.blue[i] +
      ", " +
      0.8 +
      ")";
    ctx.fillRect(this.x[i], this.y[i], this.radius[i], this.radius[i]);
  }
};

export default Particles;
