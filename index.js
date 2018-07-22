console.log("hello");

// Twitter API call to get recent tweets

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

console.log(randomString(33));

var twitterSearchUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=anthony+bourdain&lang=en&result_type=recent&count=5';

var twitterHeaders = {
  Authorization: {
    oauth_consumer_key='',
    oauth_nonce=randomString(33);
    oauth_signature=
    oauth_signature_method=HMAC-SHA1
    oauth_timestamp=
    oauth_token=
    oauth_version=1.0
  }
}

fetch()
