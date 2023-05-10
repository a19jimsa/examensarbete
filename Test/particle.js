"use strict";
import { getRandomInt, getRandomFloat } from "../Util/random.js";
import { ctx, canvas } from "./index.js";

class Particle {
  constructor() {
    this.x = getRandomFloat(0, canvas.clientWidth);
    this.y = getRandomFloat(0, canvas.clientHeight);
    this.vx = getRandomFloat(-1, 1);
    this.vy = getRandomFloat(-1, 1);
    this.red = getRandomFloat(0, 255);
    this.green = getRandomInt(0, 255);
    this.blue = getRandomInt(0, 255);
    this.radius = getRandomInt(1, 10);
  }
}

Particle.prototype.update = function () {
  let dx, dy, dist;
  dx = 640 - this.x;
  dy = 480 - this.y;
  dist = Math.sqrt(dx * dx + dy * dy);
  this.vx += dx / dist; // Gravitational force
  this.vy += dy / dist;
  this.x += this.vx * 0.1; // Euler integration
  this.y += this.vy * 0.1;
};

Particle.prototype.draw = function () {
  ctx.fillStyle =
    "rgba(" +
    this.red +
    ", " +
    this.green +
    ", " +
    this.blue +
    ", " +
    0.8 +
    ")";
  ctx.fillRect(this.x, this.y, this.radius, this.radius);
};

export default Particle;
