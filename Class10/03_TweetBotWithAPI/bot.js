// bring in the Twit package
const Twit = require("twit");

const config = require('./config.js');

var T = new Twit(config);

// xkcd API request
var comicNum = Math.floor(Math.random() * 1000)
var url = "https://xkcd.com/" + comicNum + "/info.0.json";

// const is a var that never changes
const request = require('request');

// call the first time
botTweet();

// two parameters - callback, how many milliseconds between executing the 
// callback function
// calling this function every 5 minutes
setInterval(botTweet, 60*5*1000);

function botTweet(error, data, response){

  // this is the pure JavaScript version of loadJSON and gotData is our callback  
  request(url, gotData);

  // all code reliant on JSON from the API call must happen inside the gotData
  // function or we run the risk of using the data variable before the API call
  // is complete
  // because gotData is a callback, this function will only be executed after we
  // have successfully requested the data
  function gotData(error, response, body) {
    var data = JSON.parse(body);
    var tweet = "here's a comic from the year " + data.year + " and it's called " +
     data.title;

    T.post('statuses/update', {status: tweet}, tweeted);

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
}
