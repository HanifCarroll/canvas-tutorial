import { getRandomColor } from "./helpers";

// SETUP
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight;

const xOffset = window.innerWidth - canvas.width;

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", event => onMouseMove(event));

function onMouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}

window.addEventListener("resize", resizeWindow);

function resizeWindow() {
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight;
  makeCircles(200, 10);
}

class Circle {
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
// END SETUP

// MAIN
let circles = [];
makeCircles(200, 10);
animate();

function makeCircles(amount, radius) {
  circles = [];

  for (let i = 0; i < amount; i++) {
    radius = Math.random() * 15 + 5;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;

    circles.push(new Circle(x, y, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => circle.update());
}
// END MAIN
