var zipsDictionary = {}
var table;
// left of the colon (the zip code) is the called the key
// right of the colon (frequency) is called the value
// together they are called key-value pair
var currZip = {};

function preload(){
  // the file is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('assets/Fireworks2020_311.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  print(table.getRow(1));
  for(var i=0; i<table.getRowCount(); i++){
    // get the zip code of the 311 call
    currZip = int(table.get(i, "Incident Zip"));
    // is the zip code in the dictionary
    if(currZip in zipsDictionary){
      zipsDictionary[currZip] += 1;
    } else {
      zipsDictionary[currZip] = 1;
    }
  }

  print(zipsDictionary);
}

function draw() {
  background(220);

  var x_val = 40;
  var y_val = 40;
  // pure JavaScript
  for (var [key, value] of Object.entries(zipsDictionary)){
    if(y_val > height - 40){
      // this creates a new column
      x_val += 350;
      // this sets the 'cursor' at the top of the new column
      y_val = 40;
    }
    // approx range of 311 calls per zip code is between 1 and 2000
    textSize(map(value, 1, 2000, 6, 100));
    text(key, x_val, y_val);
    y_val +=40;
  }
}
