console.log("I'm running now!");

var Twit = require('twit');
var config = require('./config.js');

var T = new Twit(config);

//  look into making this block of code it's own module
//  search twitter for all tweets containing specified words
//

var params = {
  q: '#AnthonyBourdain',
  count: 5
};

T.get('search/tweets', params, gotTweets);

function gotTweets(err, data, response) {
  var tweets = data.statuses;

  for (var i = 0; i < tweets.length; i++) {
    console.log(`Tweet #${i+1}: ${tweets[i].text} -@${tweets[i].user.screen_name}`);
  }

};
