// an array of bubbles
var bubbles = [];

function setup() {
  createCanvas(1000, 1000);
  // add new bubble
  for(var i=0; i<100; i++) {
    //random(width) - gives me a random number between 0 and the width of the canvas
    bubbles.push( new Bubble(random(width),random(height)) );  
  }
}

function draw() {
  background('red');
  for(var i=0; i<bubbles.length; i++){
    //get the ith bubble in the list
    // i = 0 --> get the first bubble
    // i = 1 --> get the second bubble
    bubbles[i].move();
    bubbles[i].display();
  }
}

function mouseClicked(){
  // did i click any of the bubbles?
  for(var i=0; i<bubbles.length; i++){
    bubbles[i].clicked();
  }
}

// bubble factory
class Bubble{
  // assembly line
  // need starting x positiong
  // need starting y position
  constructor(x,y){
    // person on assembly line assigning x value
    this.posX = x;
    // person on assembly line assigning y value
    this.posY = y;
    this.radius = 20;
    this.col = color(0,0,255);
  }

  // functions inside a class do not need the word function
  display() {
    fill(this.col);
    circle(this.posX, this.posY, this.radius);
  }

  move() {
    // move left or right
    this.posX += random(-3, 3);
    // move up or down
    this.posY += random(-3, 3);
  }

  // if bubble cliked - do something
  clicked(){
    // calculate the distance between mouseX & mouseY and the center of our bubble
    var distance = dist(mouseX,mouseY,this.posX, this.posY);
    // if distance is less then our radius (i clicked on THIS bubble), change color
    // of THIS bubble
    if(distance < this.radius) {
      this.col = color('pink');
    }
  }
}
