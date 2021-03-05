// bring in the Twit package
const Twit = require("twit");

const config = require('./config.js');

var T = new Twit(config);

// xkcd API request
var comicNum = Math.floor(Math.random() * 1000)
var url = "https://xkcd.com/" + comicNum + "/info.0.json";

// const is a var that never changes
const request = require('request');
const fs = require('fs');

var comic_data;
var tweet;

// call the first time
botTweet();

// two parameters - callback, how many milliseconds between executing the 
// callback function
// calling this function every 5 minutes
setInterval(botTweet, 60*5*1000);

function botTweet(error, data, response){

  request(url, gotData);

  // update for next time
  comicNum = Math.floor(Math.random()*1000);
  url = "https://xkcd.com/" + comicNum + "/info.0.json";

  function gotData(error, response, body) {
    comic_data = JSON.parse(body);
    tweet = "here's a comic from the year " + comic_data.year + " and it's called " +
     comic_data.title;

    // we need to download the comic image from the xkcd API and save it to our
    // images folder
    // we define the download function below
    // two parameters - 1. url 2. filename
    download(comic_data.img, 'images/comic' + comicNum + '.png');

    // two parameters - the url containing the image, and a filename to save the image
    // everything that happens in the download function (after the request.head line)
    // ensures that the image is already downloaded!
    function download(url, filename){
      // this is downloading the image from the url to our images folder
      // when the download is complete, it will call the finished function
      request(url).pipe(fs.createWriteStream(filename)).on('close', finished);
      
      function finished(){
          // Twitter will only post images with base64 encoding, so we need to
          // encode our newly downloaded image
          var encoded_img = fs.readFileSync(filename, {encoding: 'base64'});
      
          // post just the encoded image
          // call the uploaded function when we're done
          T.post('media/upload', {media_data: encoded_img}, uploaded);
      }
    }
        
    function uploaded(error, data, response) {
      // get the id assocaited with the posted image
      // we'll use the id to attach it to our tweet
      var mediaIdStr = data.media_id_string;
      // altText is what will appear to someone using a 
      // screen reader
      var altText = comic_data.transcript;
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
      
      // post the metadata, call createMedia function when done
      T.post('media/metadata/create', meta_params, createdMedia);

      function createdMedia(error, data, response){
        // route (what are we doing?)
        // post is a type of request
        // post is creating a NEW object
        var tweet_params = {status: tweet, media_ids: mediaIdStr};
        T.post('statuses/update', tweet_params, tweeted);
      }
    }

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
