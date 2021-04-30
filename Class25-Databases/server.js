const bayes = require('bayes');
const SW = require('stopword');
const fs = require('fs');

const Datastore = require('nedb');
const our_db = new Datastore('database.db');
// gives us access to the database
our_db.loadDatabase();
// our_db.insert({human: "this is a human", computer: "hello human, i'm a computer"});



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

var music_respones = ["i've been told never to sing in public",
"i also love music"]

var sport_responses = ["sport stuff!", "sports are a great way to experience the outdoors",
"i also enjoy playing sports"];

function newConnection(socket){
    console.log("new connection! " + socket.id);

    socket.on('guess', guessMsg);
    socket.on('getData', dataMsg);

    async function guessMsg(data){
        // "I'm playing soccer tonight :)"
        ml_ready_data = cleanup(data.human);

        var category = await awesome_classifier.categorize(ml_ready_data);
        var comp_answer;
        if(category == 'music'){
            comp_answer = music_respones[Math.floor(Math.random() * music_respones.length)];
        } else if(category == 'sports'){
            comp_answer = sport_responses[Math.floor(Math.random() * sport_responses.length)];
        }
        //  var database_entry = {
        //     human: data,
        //     computer: comp_answer,
        //     classification: category,
            
        //  };
        // tacking on to the original data structure
        data.classification = category;
        data.computer = comp_answer;
        our_db.insert(data);
        // broadcast.emit - send it everyone but the messenger
        // .emit - send it to just the messenger
        socket.emit('guess', comp_answer);
    }

    function dataMsg(data){
        // docs is an array with every data entry that matches your
        // find criteria
        our_db.find( {classification: data}, function(err, docs){
            if(err){
                console.log(err);
            } else {
                socket.emit('getData', docs);
            }
        })
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

