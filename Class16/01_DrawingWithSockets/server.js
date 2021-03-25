// backend code
// ie --> server code

console.log("My server is running");

var express = require('express');

// app --> application
// using the constructor to create an express app
var app = express();

// create our server
var server = app.listen(3000);

// have my application use files in the public folder
app.use(express.static('public'));

var socket = require('socket.io');

// create a variable that keeps track of inputs and outputs
var io = socket(server);

// set up a connection event - ie new car of the highway lane
// second parameter - callback
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("new connection! " + socket.id);

    socket.on('circle', mouseMsg);
    socket.on('emoji', emojiMsg);

    function mouseMsg(data){
        // console.log(data);
        socket.broadcast.emit('circle', data);
    }

    function emojiMsg(data){
        // console.log(data);
        socket.broadcast.emit('emoji', data);
    }
}
