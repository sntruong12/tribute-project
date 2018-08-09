console.log("I'm running now!");

var Twit = require('twit');

var config = require('./config.js');
var express = require('express');

var server = express();
server.use(express.static('public'))

var port = 1337;
server.listen(port, function() {
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
// get media
//

var mediaParams = {
  screen_name: 'Bourdain',
  count: 100,
  exclude_replies: true,
  include_rts: false
};

var mediaUrlArray = [];

T.get('statuses/user_timeline', mediaParams, gotMedia);

function gotMedia(err, data, response) {
  // mediaUrl = data[0].entities.media[0].media_url_https;
  // console.log(mediaUrl);
  var returnedTweets = data.length
  console.log(returnedTweets + " tweets in this response");

  for (var i = 0; i < returnedTweets; i++) {
    if (data[i].entities.hasOwnProperty('media')) {
      console.log(`Tweet #${i+1} has an image located at this link - ${data[i].entities.media[0].media_url_https}`);
      mediaUrlArray.push(data[i].entities.media[0].media_url_https);
    }
  }

  console.log(mediaUrlArray);

};
