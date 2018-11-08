import Circle from "./Circle";

// SETUP
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const balls = document.getElementById("balls");

balls.addEventListener("input", () => makeCircles(balls.valueAsNumber, 10));
canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight;

window.addEventListener("resize", resizeWindow);

function resizeWindow() {
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight;
  makeCircles(balls.valueAsNumber, 10);
}
// END SETUP

// MAIN
let circles = [];
makeCircles(balls.valueAsNumber, 10);
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
