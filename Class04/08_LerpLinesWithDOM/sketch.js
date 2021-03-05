var lines = []

var y_val = 0.0;
var dx;
var period = 1000; // how many pixels before the wave repeats
var spacing = 20; // how far apart each line is
var theta = 0.0; // start angle at 0

var button;
var moving = true;
var slider;

function setup() {
  createCanvas(1000, 1000);
  dx = (TWO_PI/period) * spacing;
  for (var i = 0; i < width/20; i++) {
    lines.push(new Line(i*20, i*8));
  }
  button = select('#startstop')
  button.mousePressed(startStop);
  createP("This slider controls the spacing")
  slider = createSlider(10,30,20);
}

function draw() {
  background(0);
  dx = (TWO_PI/period) * slider.value();
  theta  += .02;
  var x = theta;
	for(var i=0; i<lines.length; i++){
    if(moving) {
      lines[i].shift(sin(x)*175.0);
    }
    lines[i].display();
    x += dx;
  }
}

function startStop(){
  moving = !moving;
}

class Line{
  constructor(x,c){
    this.xPos = x;
    this.c = c;
    this.yOffset = 0;
  }

  display(){
    strokeWeight(10);
    stroke(this.c);
    line(this.xPos, this.yOffset+200, this.xPos, this.yOffset+600);
  }

  shift(y){
    this.yOffset = y;
  }

}
