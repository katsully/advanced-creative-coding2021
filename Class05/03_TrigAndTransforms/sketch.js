var angle;

var circleX;
var circleY;
var radius;
var xCoord;
var yCoord;

var slider;

function setup() {
  createCanvas(600, 600);
  
  circleX = width/2;
  circleY = height/2;
  radius = 150;

  angle = 0.0;

  slider = createSlider(0,width, 300);
  circleX = slider.value();

}

function draw() {
  background(0);
  circleX = slider.value();
  stroke(255);
  noFill();
  
  // we're about to move or rotate the canvas temporarily
  push();

  // move the pivot point!
  // this line changes the center point of the canvas to 0,0
  translate(circleX, circleY);
    
  rotate(angle);

  // TWO_PI = 2 * PI
  for(var i=0; i < TWO_PI; i+= PI /8){
    xCoord =  cos(i) * radius;
    yCoord = sin(i) * radius;
    line(0,0,xCoord, yCoord);
  }

  // center x point, center y point, diameter
  circle(0, 0, radius*2);

  // resets the center point to width/2, height/2
 pop();

  angle += 0.01;
}
