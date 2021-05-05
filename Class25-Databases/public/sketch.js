var chat_input;
var chat_button;
var machine_text;

var show_text = "";

var musicButton;
var sportsButton;
var my_canvas;
var chat_img;

function setup() {
  my_canvas = createCanvas(400, 400);

  chat_input = createInput('Chat with me!');
  chat_input.style('margin', '60px');
  chat_input.size(100);
  chat_button = createButton("Enter");
  chat_button.style('margin', '60px');
  chat_button.mousePressed(enteredChat);

  machine_text = createP();

  // set up socket
  socket = io.connect('http://localhost:3000');
  socket.on('guess', makeAGuess);
  socket.on('getData', printHumanChats);

  sportsButton = createButton("sports");
  musicButton = createButton("music");
  sportsButton.mousePressed(getSportChats);
  musicButton.mousePressed(getMusicChats);

  background('#EF4648');

}

function getSportChats(){
  socket.emit('getData', 'sports');
}

function getMusicChats(){
  socket.emit('getData', 'music');
}

function printHumanChats(docs){
  for(var i=0; i<docs.length; i++){
    createP(docs[i].human);
    var raw = new Image();
    raw.src = docs[i].img64;
    raw.onload = function() {
      // shrink org image so we can see the current canvas behind it
      // a container for our image and we're setting the width and height
      chat_img = createImage(raw.width/2, raw.height/2);
      // this is drawing our image from the base64 in the database
      chat_img.drawingContext.drawImage(raw, 0, 0);
      // draw image in lower right-hand corner, with each image moving to
      // the right
      image(chat_img, width/2 + (i*20), height/2);
      tint(0, 153, 204, 126); // tint it blue
    }
  }
}

function enteredChat(){
  var chat_text = chat_input.value();
  var data = {
    human: chat_text,
    // elt gives the underlining html element
    // toDataURL converts our image to base64
    img64: my_canvas.elt.toDataURL()
  }

  // send data to server
  socket.emit('guess', data);
}

function makeAGuess(data){
  machine_text.html(data);
}

function draw() {
  // background('#EF4648');
  textSize(32);
  stroke('#EFEEEE');
  text(show_text, 20, 80);
}

function keyTyped(){
    show_text += key;
}