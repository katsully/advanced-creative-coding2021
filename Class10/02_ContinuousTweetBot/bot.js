// bring in the Twit package
const Twit = require("twit");

const config = require('./config.js');

var T = new Twit(config);

// calling botTweet here is optional because setInterval will call it
// but I added this line so I don't need to wait 5 minutes for the first tweet
botTweet();

// two parameters - 1. callback, 2. how many milliseconds between executing the 
// callback function
// i'm calling this function every 5 minutes
setInterval(botTweet, 60*5*1000);

function botTweet(error, data, response){

    T.post('statuses/update', {status: "Hi! I'm a new bot " + Math.floor(Math.random()*100)}, tweeted);

    // this function let's us know if everything is OK - 
    // you could also look at your Twitter profile
    function tweeted(error, data, response){
        if(error){
        console.log(error);
        } else {
        console.log("You're doing great! " + data.text);
        }
    }
}
