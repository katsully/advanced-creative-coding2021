// this determines your grid, right now the grid will be 20x20, try changing this number!
// if you change this number to 1 or 100, the code will still work without changing 
// anything else!
var numOfSquaresAcross = 20;

var sizeOfSquare;

var index;

function setup() {
  createCanvas(1000, 1000);

  // this number is how the number of pixels for each square
  // if the width (and height) are 1000 pixels, and there will be 20 squares across the canvas
  // then 1000 pixels / 20 squares = 50 pixles per square
  sizeOfSquare = width / numOfSquaresAcross;
}

function draw() {
  background(220);

  index = 0;

   // these two for loops are called a nested for loop, this is how we will create the grid
   for (var x = 0; x < width; x += sizeOfSquare)
   {
     for (var y = 0; y < height; y += sizeOfSquare)
     {
      textSize(12); 
      text(str(index++), x+5, y+10);
     }
   }
}