var url= "http://api.open-notify.org/iss-now.json";

var space_data;
var button;

var xLoc;
var yLoc;
var time;
var table;

function preload(){
  loadJSON(url, spaceInfo);
  table = loadTable('assets/space_locations.csv', 'csv', 'header');
}

function spaceInfo(data){
  space_data = data;

  // longitudes and latitudes go from -180 to 180
  // long = x
  // lat = y
  xLoc = map(space_data.iss_position.longitude, -180, 180, 0, 400);
  yLoc = map(space_data.iss_position.latitude, -180, 180, 0, 400);
  time = hour() + ":" + minute() + ":" + second();
}

function setup() {
  createCanvas(400, 400);

  button = select('button');
  button.mousePressed(updatedLocation);
}

function updatedLocation(){
  // save current place
  var newRow = table.addRow();
  // set String - 2 parameters
  // first parameter - column name
  newRow.setString("xLocation", xLoc);
  newRow.setString("yLocation", yLoc);
  newRow.setString("time", time);
  saveTable(table, 'space_locations.csv', 'csv');
  table = loadTable('assets/space_locations.csv', 'csv', 'header');

  // upload new place
  loadJSON(url, spaceInfo);
}

function draw() {
  background(220);

  circle(xLoc,yLoc, 25);

  for(var i=0; i<table.getRowCount(); i++){
    var xcoord = table.get(i,0);
    var ycoord = table.get(i,1)
    circle(xcoord, ycoord, 25);
    text(table.getString(i,2), xcoord+10, ycoord-10);
  }
}
