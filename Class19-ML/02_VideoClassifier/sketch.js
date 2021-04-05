// mobilenet is our pretrained model
var mobilenet;
var myVid;
var label = "";

function setup() {
  createCanvas(1920, 1080);
  myVid = createCapture(VIDEO);
  mobilenet = ml5.imageClassifier('MobileNet', myVid, modelLoaded);
}

function modelLoaded(){
  console.log("The model has been loaded!");
  mobilenet.predict(predictionMade);
}

// error first callback
function predictionMade(error, data){
  if(error){
    console.log(error);
  } else {
    // console.log(data);
    label = data[0].label;
    // recursive - calling itself
    mobilenet.predict(predictionMade);
  }
}

function draw() {
  background(220);
  image(myVid, 0,0);
  textSize(32);
  text(label, 10, height-20);
}
