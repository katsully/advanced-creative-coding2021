var lines = []

var dx;

// try changing these variables one at a time to get a sense of what they do!
var period = 1000; // how many pixels before the wave repeats
var spacing = 20; // how far apart (in pixels) each line is from another
var theta = 0.0; // start angle at 0

function setup() {
  createCanvas(1000, 1000);
  dx = (TWO_PI/period) * spacing;
  for (var i = 0; i < width/20; i++) {
    lines.push(new Line(i*20, i*8));
	}
}

function draw() {
  background(0);
  theta  += .02;
  var x = theta;
	for(var i=0; i<lines.length; i++){
    lines[i].display(sin(x)*175.0);
    x += dx;
  }
	
}

class Line{
  constructor(x,c){
    this.xPos = x;
    this.c = c;

  }

  display(y){
    strokeWeight(10);
    stroke(this.c);
    line(this.xPos, y+200, this.xPos, y+600);
  }

}
