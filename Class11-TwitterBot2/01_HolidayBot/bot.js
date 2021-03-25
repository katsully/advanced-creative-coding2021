// bring in the Twit package
const Twit = require("twit");
const request = require("request");
const fs = require("fs");

const config = require('./config.js');

var T = new Twit(config);

var holiday_url = "https://date.nager.at/Api/v2/NextPublicHolidaysWorldwide";
var countryCode = "";

var tweet;

// calling botTweet here is optional because setInterval will call it
// but I added this line so I don't need to wait 5 minutes for the first tweet
botTweet();

// two parameters - 1. callback, 2. how many milliseconds between executing the 
// callback function
// i'm calling this function every 5 minutes
setInterval(botTweet, 60*5*1000);


function botTweet(error, data, response){

	request(holiday_url, gotData);

	function gotData(error, response, body){
		var holiday_data = JSON.parse(body);
		var randomHoliday = Math.floor(Math.random() * holiday_data.length);
		countryCode = holiday_data[randomHoliday].countryCode;
		var flag_url = "http://www.geognos.com/api/en/countries/flag/" + countryCode + ".png"  
		tweet = "The next public holiday " + holiday_data[randomHoliday].localName + " on " + 
		holiday_data[randomHoliday].date + " in " + countryCode;

		// download - two parameters 
		// 1 - url
		// 2 - filename (ie where is it being saved
		// and what is it called)
		download(flag_url, "images/flag" + countryCode + ".png");
	}

	function download(url, filename){
		// think of 'Save As' when you save an image
		// from the interwebs
		request(url).pipe(fs.createWriteStream(filename)).on('close', encodeImage);

		function encodeImage(){
			// encode the image!
			var encoded_img = fs.readFileSync(filename, {encoding: 'base64'});
			T.post('media/upload', {media_data: encoded_img}, insertMetaData);
		}
	}

	function insertMetaData(error, data, response){
		if(error){
			console.log(error);
		}
		var mediaIdStr = data.media_id_string;
		var altText = "This is a flag of " + countryCode;
		//var meta_params = {media_id: mediaIdStr, alt_text: {text: altText}};
		var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };


		T.post('media/metadata/create', {media_id: mediaIdStr}, createdMedia);
	

		function createdMedia(error, data, response){
			if(error){
				console.log("createdMedia")
				console.log(error);
				console.log(data);
			}
			var tweet_parameters = {status: tweet, media_ids: mediaIdStr};
			T.post('statuses/update', tweet_parameters, tweeted);
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
