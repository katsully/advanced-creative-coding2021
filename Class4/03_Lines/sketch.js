// top y coord for the line
var y1 = 200;
// bottom y coord for the line
var y2 = 800;

var xCoord = 10;
var color = 5;


function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(0);

  // reset color and xCoord variables
  color = 5;
  xCoord = 10;

  strokeWeight(10);

  for (var i = 0; i < 50; i++) {
	stroke(color);
	line(xCoord, y1, xCoord, y2);

	xCoord += 20;
	color += 8;
  }
  
}
