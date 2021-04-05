var mobilenet;
var img;
var label = ""

function preload(){
  img = loadImage("images/doggo.jpeg");
}

function setup() {
  createCanvas(1910, 1000);
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);

  image(img, 0, 0, width, height);

  mobilenet.predict(img, labeledImg);
}

function modelReady(){
  console.log("model ready!");
}

function labeledImg(error, results){
 // ny use of console.error, or other functions that write to stderr, 
 // will block your process until the output has all been written.
  if(error){
   console.error(error);
 } else {
  //  console.log(results);
  //  console.log(results[0].label);
  //  createP(results[0].label);
  label = results[0].label;
 }
}

function draw() {
  background(220);
  image(img, 0, 0);
  textSize(32);
  text(label, 20, height-20);
}
