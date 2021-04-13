var img;
var detector;

var myVid;
var objectResults = [];

function preload(){
  // img = loadImage("images/dog-and-cat.jpg");
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  createCanvas(640, 480);
  // img.resize(width, height);
  myVid = createCapture(VIDEO, videoLoaded);
}

function videoLoaded(){
  myVid.size(640, 480);
  myVid.hide();
  detector.detect(myVid, objectsIDed);
}

// callbacks on ml5 functions are error first
function objectsIDed(error, results){
  if(error){
    console.error(error);
  } else {
    // console.log(results);
    objectResults = results;
    // function calling itself is called a recursive function
    detector.detect(myVid, objectsIDed);
  }
}

function draw() {
  // background(220);
  tint(255,0,0);
  image(myVid,0,0);
  for(var i=0; i<objectResults.length; i++){
    var obj = objectResults[i];
    // draw bounding box
    stroke(0,255,0);
    strokeWeight(5);
    noFill();
    rect(obj.x, obj.y, obj.width, obj.height);
    // write object label
    stroke(0);
    textSize(32);
    strokeWeight(1);
    text(obj.label, obj.x + 10, obj.y + 10);
  }
}
