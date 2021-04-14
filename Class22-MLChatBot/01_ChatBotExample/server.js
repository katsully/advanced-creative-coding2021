const bayes = require('bayes');
const SW = require('stopword');
const fs = require('fs');

// express application
const express = require('express');
var app = express();

// create our server
var server = app.listen(3000);

// have my application use files in the public folder
app.use(express.static('public'));

var awesome_classifier;
fs.readFile('./classifier.json', downloadedFile);

// syntax is regular expression
// only words with letters or numbers
const alphanumeric = /^[0-9a-zA-Z]+$/;

function downloadedFile(error, data){
    if(error){
        console.log(error);
    } else {
        awesome_classifier = bayes.fromJson(data);
        // don't want to start sockets until I 'read' the classifier
        io.sockets.on('connection', newConnection);
    }
}

// bring in the sockets!
var socket = require('socket.io');
var io = socket(server);


function newConnection(socket){
    console.log("new connection! " + socket.id);

    socket.on('guess', guessMsg);

    async function guessMsg(data){
        // "I'm playing soccer tonight :)"
        ml_ready_data = cleanup(data);

        var category = await awesome_classifier.categorize(ml_ready_data);
        // broadcast.emit - send it everyone but the messenger
        // .emit - send it to everyone, including the messenger
        socket.emit('guess', category);
    }
}

function cleanup(tweet){
    // tweet split up into indiv words
    var temp_split_tweet = tweet.split(" ");
    // this will store the 'good' words
    var temp_new_words = [];
    temp_split_tweet = SW.removeStopwords(temp_split_tweet);
    
    for(var i=0; i<temp_split_tweet.length; i++){
        // test if word only contains letters or numbers
        // and if length of word is greater than 2
        if(alphanumeric.test(temp_split_tweet[i]) && temp_split_tweet[i].length > 2){
            temp_new_words.push(temp_split_tweet[i].toLowerCase());
        }
    }
    // get rid of any duplicates
    // ...   -> spread operator
    var uniq = [...new Set(temp_new_words)];
    var final_words = uniq.join(", ");
    return final_words;
}

