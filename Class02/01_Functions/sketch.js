function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
}

function draw() {
  background(0);
  drawCoolRect(100, 100, 7);
  drawCoolRect(750, 750, 15);
}

function drawCoolRect(x,y, numOfRects){
  for(var i=0; i<numOfRects; i++) {
    // lerpColor
    // THREE parameters - starting color, ending color, where are you between the colors (0-1)?
    // 0 - all the way at the starting point
    // 1 - all the way at the ending point
    var blendColor = lerpColor(color(255,0,0), color(0,0,255), i/numOfRects );
    fill(blendColor);
    rect(x, y, 200 - (i*15), 200 - (i*15));
  }
}
