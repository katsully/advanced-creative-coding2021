var table;

var minX, maxX, minY, maxY;

var row;
var currX, currY;

var particles = []

function preload(){
  table = loadTable("assets/Z_Solo_Best.csv", 'csv');
}

function setup() {
  createCanvas(800, 800);

  frameRate(30);

  minX = 100000;
  minY = 100000;
  maxX = -100000;
  maxY = -100000;

  row = 5;

  // iterating through each row
  for(var i=5; i<table.getRowCount(); i++){
    // iterate through ea column
    for(var j=2; j<table.getColumnCount(); j+=3){
      if(table.getNum(i,j) < minX){
        minX = table.getNum(i,j);
      } else if(table.getNum(i,j) > maxX){
        maxX = table.getNum(i,j);
      } else if(table.getNum(i,j+1) < minY){
        minY = table.getNum(i,j+1);
      } else if(table.getNum(i,j+1) > maxY){
        maxY = table.getNum(i,j+1);
      }
    }
  }

  console.log("min x: ", minX);
  console.log("max x: ", maxX);
  console.log("min y: ", minY);
  console.log("max y: ", maxY);
}

function draw() {
  background(220);
  fill('red');
  // iterate through each marker
  var col, markerIdx;
  for(col = 2, markerIdx =0; col < table.getColumnCount(); col+=3, markerIdx++){
    currX = map(table.getNum(row, col), minX, maxX, 0, width);
    currY = map(table.getNum(row, col+1), maxY, minY, 0, height);

    // if we are on the first frame
    if(row == 5){
      particles.push(new Particle(currX, currY));
    }
    // once we're past the first frame 
    else {
      particles[markerIdx].update(currX, currY);
      particles[markerIdx].display();
    }

    // circle(currX, currY, 15);
  }

  // advance animation to next frame
  if(row < table.getRowCount()){
    row++;
  } else {
    noLoop();
  }
}
