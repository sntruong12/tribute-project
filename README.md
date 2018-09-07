# tribute-project
Purpose  
---

This is a tribute page for Anthony Bourdain. This is a private project that wasn't deployed. I wanted to create this page to practice Grid CSS in addition to brushing up on HTML. Along the way I was able to use Node.js, Express, and Twit (npm module for interacting with Twitter API). Additionally was able to use handlebars along the way to serve up content from Twitter.  

The main features of this page is that it's responsive by using Grid CSS.
Another feature is that popular tweets that contain the string "Anthony Bourdain" is served up on every load.
Additionally a random quote from Bourdain is loaded every time the app is launched.  


Challenges  
---
The first challenge I faced here was figuring out where I can pull images to post on the page. The original plan was to use Instagram's API to pull a user's images. This was quickly dismissed as their API doesn't allow you to pull images from specific users. I ended up deciding to use Twit to grab recent images from Bourdain's twitter timeline.  

Another challenge I faced was serving up the data from Twitter to the front end of the website. I was able to use the view engine handlebars and express to help achieve this. Specifically the built in method .get in express allowed me to serve the Twitter data (images and popular tweets) when the user loads the root directory or home page.  

Deploying Locally  
---
Create a file in the root directory called config.js.  
Create a Twitter API account.  
This file will contain your credentials from your Twitter API account formatted in the following way.  
module.exports = {
  consumer_key:         'x',
  consumer_secret:      'x',
  access_token:         'x',
  access_token_secret:  'x',
};  
Run node index.js from the root directory.  
Open a browser and navigate to http://localhost:1337/  
