var balls = [];

var button;
var button2;
var slider;

function setup() {
  createCanvas(1000, 800);

  balls[0] = new Ball(random(500), random(500), 2, 3);
  balls[1] = new Ball(random(500), random(500), -3, 1);

  button = select('#add');
  button2 = select('#addMore');
  // callback function
  // if no (), it's the function defintion
  // asynchorous
  button.mousePressed(addAnother);
  button2.mousePressed(addABunch);

  // createSlider - minValue, maxValue, and currentValue
  slider = createSlider(-5,5,0);
}

function addAnother(){
  // push is a function!
  balls.push(new Ball(random(width), random(height), random(-5,5), random(-5,5)));
}

function addABunch(){
  for (var i=0; i<10; i++){
    addAnother();
  }
}

function draw() {
  background(220);

  for(var i=0; i<balls.length; i++){
    balls[i].move(slider.value());  
    balls[i].render();
  }

}


