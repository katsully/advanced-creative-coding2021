// client code
// frontend

var socket;

var buttonSmall, buttonLarge, buttonNormal, buttonClear, buttonSave, buttonTweet;
var circleSize;

var emoji1;
var emoji2;

var slider;

var myCanvas;

var imgCounter;

function preload(){
  emoji1 = loadImage('images/emoji_not_for_old_people.png');
  emoji2 = loadImage('images/swirls.png');
}

function setup() {
  myCanvas = createCanvas(800, 800);

  // this connects the front end code to the socket communications
  // socket = io.connect('https://drawing-funtimes.herokuapp.com/');

  socket = io.connect('http://localhost:3000')
  
  background('red');

  // handle the broadcast calls coming from the server
  socket.on('circle', newCircleDrawing);
  socket.on('emoji', newEmojiDrawing);
  socket.on('clear', function(){
    background('red');
  });


  circleSize = 25;
  buttonSmall = select('#smaller');
  buttonLarge = select('#larger');
  buttonNormal = select('#normal');
  buttonClear = select("#clear");
  buttonSave = select("#save");
  buttonTweet = select("#tweet");

  buttonSmall.mousePressed( makeSmaller );
  buttonLarge.mousePressed( makeLarger );
  buttonNormal.mousePressed( makeNormal );
  buttonClear.mousePressed( clearIt );
  buttonSave.mousePressed( saveIt );
  buttonTweet.mousePressed( tweetIt );

  colorMode(HSB);

  slider = createSlider(0,360,0);

  imgCounter = 1;
}

function makeSmaller(){
  circleSize = 15;
}

function makeLarger(){
  circleSize = 55;
}

function makeNormal(){
  circleSize = 25;
}

function clearIt(){
  // clear background for MY browser
  background('red');

  // tell all the other browsers (ie the other clients)
  // to clear their screens
  socket.emit('clear');
}

function saveIt(){
  var filename = "myCanvas" + imgCounter + ".png";
  saveCanvas(myCanvas, filename);
  imgCounter++;
}

function tweetIt(){
  var data = {
    imgNum: imgCounter-1
  }
  
  socket.emit('tweet', data);
}

function newCircleDrawing(data){
  fill(data.hue, 100, 100);
  ellipse(data.x, data.y, data.size, data.size);
}

function newEmojiDrawing(data){
  if(data.img == 1){
    image(emoji1, data.x, data.y, 50, 50);
  }
}

function draw() {
}

// will activate whenever you click and drag
function mouseDragged(){
  fill(slider.value(), 100, 100);
  ellipse(mouseX, mouseY, circleSize, circleSize);

  // data is what sockets will send to other clients
  // object literal notation
  var data = {
    x: mouseX,
    y: mouseY,
    size: circleSize,
    hue: slider.value()
  };

  socket.emit('circle', data);
}

function mouseClicked(){
  image(emoji1, mouseX, mouseY, 50, 50);

  var data = {
    x: mouseX,
    y: mouseY,
    img: 1
  };

  socket.emit('emoji', data);
}

