console.log("I'm running now!");

var Twit = require('twit');
var config = require('./config.js');
var quotes = require('./public/quotes.js');
var express = require('express');

var app = express();

//serves up static
app.use(express.static('public'));

var port = 1337;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});

var T = new Twit(config);

//
//  search twitter for 5 recent tweets
//

// var tweetParams = {
//   q: 'Anthony Bourdain',
//   count: 5
// };
//
// T.get('search/tweets', tweetParams, gotTweets);
//
// function gotTweets(err, data, response) {
//   var tweets = data.statuses;
//
//   for (var i = 0; i < tweets.length; i++) {
//     console.log(`Tweet #${i+1}: ${tweets[i].text} tweeted by @${tweets[i].user.screen_name}`);
//   }
//
// };

//
// get media from tweets
//

var mediaParams = {
  screen_name: 'Bourdain',
  count: 200,
  tweet_mode: 'extended',
  exclude_replies: true,
  include_rts: false
};

var mediaUrlArray = [];

T.get('statuses/user_timeline', mediaParams, gotMedia);

function gotMedia(err, data, response) {

  console.log(response.statusCode);
  var returnedTweets = data.length;
  console.log(returnedTweets + " tweets in this response");

  for (var i = 0; i < returnedTweets; i++) {
    if (data[i].hasOwnProperty('extended_entities') && data[i].extended_entities.media[0].type === 'photo') {
      console.log(`Tweet#${i+1} has the extended_entities prop`);
      mediaUrlArray.push(data[i].extended_entities.media[0].media_url_https);
    }
  }
  console.log(mediaUrlArray);
};

//
// Send tweet data to index.html
//

app.get('/', function(request, response, next) {
  response.send(mediaUrlArray);
  console.log("test");
  next();
});
