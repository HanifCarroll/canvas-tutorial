import Circle from "./Circle";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", event => onMouseMove(event));
function onMouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}

function resizeWindow() {
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight;
  makeCircles(200, 10);
}

window.addEventListener("resize", resizeWindow);

let circles = [];
makeCircles(200, 10);
function makeCircles(amount, radius) {
  circles = [];

  for (let i = 0; i < amount; i++) {
    radius = Math.random() * 15 + 5;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;

    circles.push(new Circle(c, x, y, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => circle.update());
}

animate();
