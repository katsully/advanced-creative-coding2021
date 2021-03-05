var backgroundColors = [];
var circleColors = [];

// this determines your grid, right now the grid will be 20x20, try changing this number!
// if you change this number to 1 or 100, the code will still work without changing 
// anything else!
var numOfSquaresAcross = 20;

var sizeOfSquare;

function setup() {
  createCanvas(1000, 1000);

  // hold color value for each square
  // if numOfSquaresAcross = 20 there will be 400 square/circle combos
  // 20 rows * 20 columns = 400
  for(var i=0; i< (numOfSquaresAcross * numOfSquaresAcross); i++){
    backgroundColors[i] = random(200); // assigns random color between black and light grey
    circleColors[i] = random(200);
  }

  // this number is how the number of pixels for each square
  // if the width (and height) are 1000 pixels, and there will be 20 squares across the canvas
  // then 1000 pixels / 20 squares = 50 pixles per square
  sizeOfSquare = width / numOfSquaresAcross;
}

function draw() {
  background(220);

  // idx will keep track of where we are in the color array
  var idx = 0;

  // these two for loops are called a nested for loop, this is how we will create the grid
  for (var x = 0; x < width; x += sizeOfSquare)
  {
	for (var y = 0; y < height; y += sizeOfSquare)
	{
		fill(backgroundColors[idx]);
		rect(x, y, sizeOfSquare, sizeOfSquare);

		// access the color from the color array and then increment your counter
		fill(circleColors[idx++]);
  		circle(x + sizeOfSquare/2, y + sizeOfSquare/2, sizeOfSquare/2);
	}
  }
}
