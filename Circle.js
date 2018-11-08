import { getRandomColor } from "./helpers";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const xOffset = window.innerWidth - canvas.width;

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", event => onMouseMove(event));

function onMouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}

export default class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getRandomColor();
    this.minRadius = radius;
    this.xPositive = true;
    this.yPositive = true;
  }

  draw() {
    const { x, y, radius, color } = this;

    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.fill();
  }

  update() {
    this.checkBoundaries();
    this.growCircles();
    this.draw();
  }

  checkBoundaries() {
    const xSpeedSlider = document.querySelector("#x-speed");
    const ySpeedSlider = document.querySelector("#y-speed");
    let xSpeed = parseInt(xSpeedSlider.value);
    let ySpeed = parseInt(ySpeedSlider.value);

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.xPositive = !this.xPositive;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.yPositive = !this.yPositive;
    }

    this.xPositive ? (this.x += xSpeed) : (this.x -= xSpeed);
    this.yPositive ? (this.y += ySpeed) : (this.y -= ySpeed);
  }

  growCircles() {
    const maxRadius = 80;
    const maxDistance = 50;

    if (
      Math.abs(mouse.x - this.x - xOffset) < maxDistance &&
      Math.abs(mouse.y - this.y) < maxDistance
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
  }
}
