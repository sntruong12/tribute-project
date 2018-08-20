console.log("I'm running now!");

var Twit = require('twit');
var config = require('./config.js');
var express = require('express');

var app = express();

//add handlebars view engine
var handlebars = require('express-handlebars')
	.create({defaultLayout: 'main'});  //default handlebars layout page

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); //sets express view engine to handlebars 


var port = 3393;


var T = new Twit(config);
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

app.get('/', function(req,res){ 
  res.render('home', {
  show_media: mediaUrlArray
  });  //respond with homepage
});

app.use(function(req,res){  //express catch middleware if page doesn't exist
	res.status(404);  //respond with status code
	res.render('404'); //respond with 404 page
});

app.listen(port, function() {
  console.log('server listening on port ' + port);
});