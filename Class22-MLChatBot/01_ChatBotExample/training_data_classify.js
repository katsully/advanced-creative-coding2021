// create the Twit object which will search for tweets
const Twit = require("twit");
const config = require("./config.js");
var T = new Twit(config);

var SW = require("stopword");
var fs = require("fs");

// import bayes module
var bayes = require('bayes');
// create classifier using the bayes module
var classifier = bayes();

// syntax is regular expression
// only words with letters or numbers
const alphanumeric = /^[0-9a-zA-Z]+$/;

// using trending words on twitter to affliate those tweets with certain
// categories that we are coming up with
var trends = {
    "Pereira": "sports",
    "Matsuyama": "sports",
    "Southampton": "sports",
    "BTS": "music",
    "Bjork": "music",
    "iHeartAwards︎": "music"
};

// this index will keep track of where we are in the loop
var index = 0;
// looping through our JSON (ie 'trends')
for( let [key, value] of Object.entries(trends)){
    // console.log(value);
    T.get('search/tweets', {q: key, count: 100}, async function(err, data, response){
        // 'try out' the code
        try{
            // console.log(data);
            for(var i=0; i<data.statuses.length; i++){
                var temp_tweet = data.statuses[i].text;
                // console.log(temp_tweet);
                var cleaned_up_words = cleanup(temp_tweet);
                await classifier.learn(cleaned_up_words, value);
            }
            index++;
            // if we have completed all of the 'trends'
            if(index == 6){
                // confirm your classifier works as expected
                var try_it = "sports ball he scored the big goal and won the game";
                try_it.split(" ").join(", ")                
                var try_it2 = "the single was a big hit reached the top of the charts loved the melody";
                try_it2.split(" ").join(", ")                
                console.log(await classifier.categorize(try_it));
                console.log(await classifier.categorize(try_it2));

                // serialize the classifier's state as a JSON string.
                var stateJson = classifier.toJson();
                // first parameter - name of classifier file
                fs.writeFile("./classifier.json", stateJson, function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("successfully saved the classifier");
                    }
                })
            }
        // if that doesn't work - print the error
        } catch (err){
            console.log(err);
        }
    });
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

