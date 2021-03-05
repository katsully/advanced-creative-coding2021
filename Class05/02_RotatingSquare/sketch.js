var angle;

function setup() {
  createCanvas(600, 600);
  
  // by default the first two parameters rect(upper left corner)
  // with CENTER mode, the first two parameters are the center of rectangle
  rectMode(CENTER);

  angle = 0.0;
}

function draw() {
  background(220);
  
  // we're about to move or rotate the canvas temporarily
  push();

  // move the pivot point!
  // this line changes the center point of the canvas to 0,0
  translate(width/2, height/2);
  
  rotate(angle);


  rect(0, 0, 100, 100);

  // resets the center point to width/2, height/2
  pop();

  angle += 0.01;
}
