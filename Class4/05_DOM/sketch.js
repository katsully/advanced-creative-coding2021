var image1;
var image2;
var currentImage;
var slider;
var tintColor = false;

// p5 function that delays the sketch until everything in this function is loaded
function preload(){
  image1 = loadImage("puppy1.jpg");
  image2 = loadImage("puppy2.jpg")
}

function setup() {
  createCanvas(1280, 720);

  // Hue (color) 0-360
  // Saturation (the intensity of the color) - no saturation it's white
    // 0 - 100
  // Brightness (the light of the color) - no brightness it's black
    // 0 - 100
  colorMode(HSB);


  // 'grab' this button
  // use # for id
  // use . for class
  var myButton = select('#first');
  var myOtherButton = select('#second');
  // using a callback when the button gets pressed
  myButton.mousePressed(changePuppy);
  myOtherButton.mousePressed(addSlider);

  currentImage = image1;
}

function changePuppy(){
  if(currentImage == image1){
    currentImage = image2;
  } else {
    currentImage = image1;
  }
}

function addSlider(){
  // createSlider function - takes 3 parameters
  // starting value
  // ending value
  // where is the picker
  slider = createSlider(0,360,0);
  tintColor = true;
}

function draw() {
  background(220);
  if(tintColor){
    tint(slider.value(), 100, 100);
  }
  image(currentImage, 0, 0, 1280, 720);
}
