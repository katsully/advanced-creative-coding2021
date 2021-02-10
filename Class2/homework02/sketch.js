// global variable
var myParticles = [];

function setup() {
  createCanvas(1000, 1000);
  var cButton = select('#clear_button');

  // callback - we NOT executing a function
  // we want to pass the function definition
  cButton.mousePressed(clearParticles);

}

function draw() {
  background(220);

  for(var i=0; i < myParticles.length; i++){
    //if we want to execute a function, we include ()
    myParticles[i].move();
    myParticles[i].render();
  }

}

function clearParticles(){
  // taking the array and 'emptying'
  myParticles = [];
}

function mouseDragged() {
  // mouseX and mouseY are RESERVED words
  // p5 already knows about them
  var tempParticle = new Particle(mouseX,mouseY);
  myParticles.push(tempParticle);
}

class Particle {
  constructor(mX,mY) {
    this.x = mX;
    this.y = mY;
    this.speedX = random(-3,3);
    this.speedY = random(-3,3);
    this.col = color(random(255), random(255), random(255));
    this.diameter = random(3,15);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // if the particles approaches the 'wall' change direction
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
     this.speedY *= -1;
    }
  }

  render() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}