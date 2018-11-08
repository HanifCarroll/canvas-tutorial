function getRandomColor() {
  const letters = "0123456789ABCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

const canvas = document.querySelector("canvas");

export default class Circle {
  constructor(c, x, y, radius) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = getRandomColor();
    this.minRadius = radius;
    this.speed = document.querySelector("#speed").value;
  }

  draw() {
    const { c, x, y, radius, color } = this;
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.fill();
  }

  update() {
    this.checkBoundaries();
    // this.growCircles();
    this.draw();
  }

  checkBoundaries() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.speed;
    this.y += this.speed;
  }

  // growCircles() {
  //   const maxRadius = 80;
  //   const maxDistance = 50;

  //   if (
  //     Math.abs(mouse.x - this.x) < maxDistance &&
  //     Math.abs(mouse.y - this.y) < maxDistance
  //   ) {
  //     if (this.radius < maxRadius) {
  //       this.radius += 1;
  //     }
  //   } else if (this.radius > this.minRadius) {
  //     this.radius -= 1;
  //   }
  // }
}
