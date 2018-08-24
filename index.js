console.log("I'm running now!");

var Twit = require('twit');
var config = require('./config.js');
var express = require('express');
var quotes = require('./public/quotes.js');

var app = express();

//add handlebars view engine
var handlebars = require('express-handlebars')
  .create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

var port = 1337;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});

var T = new Twit(config);

//
//  search twitter for recent tweets
//

var tweetParams = {
  q: 'Anthony Bourdain',
  count: 5,
  lang: 'en',
  result_type: 'popular'
};

function tweetCollector (tweetText, tweetUser) {
  this.tweetText = tweetText;
  this.tweetUser = tweetUser;
};

var recentTweetCollection =[];

T.get('search/tweets', tweetParams, gotTweets);

function gotTweets(err, data, response) {
  var tweets = data.statuses;

  for (var i = 0; i < 3; i++) {
    console.log(`Tweet #${i+1}: ${tweets[i].text} tweeted by @${tweets[i].user.screen_name}`);
    recentTweetCollection[i] = new tweetCollector(tweets[i].text, tweets[i].user.screen_name);
  }
};

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
// Get random number for quotes section
//

var randomNum = Math.floor(Math.random() * quotes.length);

//
// Send tweet data and quotes to home.handlebars
//

app.get('/', function(req,res){
  res.render('home', {
  imageOne: mediaUrlArray[0],
  imageTwo: mediaUrlArray[1],
  collectionOfTweets: recentTweetCollection,
  randomQuote: quotes[randomNum]
  });
});
