var chat_input;
var chat_button;
var machine_text;

var show_text = "";

var music_respones = ["i've been told never to sing in public",
"i also love music"]

var sport_responses = ["sport stuff!", "sports are a great way to experience the outdoors",
"i also enjoy playing sports"];

function setup() {
  createCanvas(400, 400);

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
}

function enteredChat(){
  var chat_text = chat_input.value();

  // send data to server
  socket.emit('guess', chat_text);
}

function makeAGuess(data){
  if(data == 'music'){
    machine_text.html(music_respones[Math.floor(Math.random() * music_respones.length)]);
  } else if(data == 'sports'){
    machine_text.html(sport_responses[Math.floor(Math.random() * sport_responses.length)]);
  }
}

function draw() {
  background('#EF4648');
  textSize(32);
  stroke('#EFEEEE');
  text(show_text, 20, 80);
}

function keyTyped(){
    show_text += key;
}