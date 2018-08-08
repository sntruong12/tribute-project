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
//  search twitter for 5 recent tweets containing Anthony Bourdain
//

var params = {
  q: 'Anthony Bourdain',
  count: 5
};

T.get('search/tweets', params, gotTweets);

function gotTweets(err, data, response) {
  var tweets = data.statuses;

  for (var i = 0; i < tweets.length; i++) {
    console.log(`Tweet #${i+1}: ${tweets[i].text} tweeted by @${tweets[i].user.screen_name}`);
  }

};
