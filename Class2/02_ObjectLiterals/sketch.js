// object literal notation
var bubble = {
  x: 100,
  y: 100,
  r: 10
}
var bubble2 = {
  x: 250,
  y: 400,
  r: 10
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background('red');
  
  circle(bubble.x, bubble.y, bubble.r);
  bubble.x += random(-3, 3);
  bubble.y += random(-3, 3);

  circle(bubble2.x, bubble2.y, bubble2.r);
  bubble2.x += random(-3, 3);
  bubble2.y += random(-3, 3);
}