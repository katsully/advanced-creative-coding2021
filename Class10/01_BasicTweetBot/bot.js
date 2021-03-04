// bring in the Twit package
const Twit = require("twit");

// your config.js file contains your keys, tokens, etc
const config = require('./config.js');

// create a Twit object - I called it T
var T = new Twit(config);

// this is what posts a tweet
T.post('statuses/update', {status: "Hello! I'm a simple tweet bot, running this code posts only 1 tweet"}, tweeted);

// this function let's us know if everything is OK - 
// or if you received an error
function tweeted(error, data, response){
  // if there's an error, print the error message to the console
  if(error){
    console.log(error);
  } else {
    // data.text represents what you're tweeting with your bot
    console.log("You're doing great! " + data.text);
  }
}