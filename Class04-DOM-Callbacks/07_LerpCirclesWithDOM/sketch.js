// this determines your grid, right now the grid will be 20x20, try changing this number!
// if you change this number to 1 or 100, the code will still work without changing 
// anything else!
var numOfSquaresAcross = 20;

var sizeOfSquare;

var shapes = [];

var doingAnimation = true;
var button;
var slider;

function setup() {
  slider = createSlider(0,10,10);
  createCanvas(1000, 1000);

  // this number is how the number of pixels for each square
  // if the width (and height) are 1000 pixels, and there will be 20 squares across the canvas
  // then 1000 pixels / 20 squares = 50 pixles per square
  sizeOfSquare = width / numOfSquaresAcross;

  // these two for loops are called a nested for loop, this is how we will create the grid
  for (var x = 0; x < width; x += sizeOfSquare)
  {
    for (var y = 0; y < height; y += sizeOfSquare)
    {
      shapes.push(new Shape(x,y))
    }
  }

  // 'grab' the button
  button = select('button');
  button.mousePressed(startStopAnimation);
}

function startStopAnimation(){
  doingAnimation = !doingAnimation;
}

function draw() {
  background(220);

  for(var i=0; i< shapes.length; i++){
    if(doingAnimation) {
      shapes[i].changeColor();
    }
    shapes[i].render();
  }

}

class Shape{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.backgroundColor = random(200);
    this.circleColor = random(200);

    // lerpColor - THREE VARIABLE
    // startingColor
    // endingColor
    // a value between 0 and 1

    // we are casting our random number as a color
    this.strokeStartingColor = color(random(200));
    this.strokeEndingColor = color(random(200));
    // this will be the x in cos(x)
    this.strokeValue = 0;
  }

  render() {
    fill(this.backgroundColor);
    rect(this.x, this.y, sizeOfSquare, sizeOfSquare);

    fill(this.circleColor);
    strokeWeight(slider.value());
    // cos(x) regardless of x, cos(x) will return a number between 0 and 1
    var strokeColor = lerpColor(this.strokeStartingColor, this.strokeEndingColor, cos(this.strokeValue));
    stroke(strokeColor);
    circle(this.x + sizeOfSquare/2, this.y + sizeOfSquare/2, sizeOfSquare/2);
  }

  changeColor(){
    this.strokeValue+=.05;
  }
}
