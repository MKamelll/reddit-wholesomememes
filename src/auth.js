// dependencies
const snoowrap = require('snoowrap');
const twit = require('twit');
require('dotenv').config();

// reddit
const redditOptions = {
  'userAgent': process.env.USER_AGENT,
  'clientId': process.env.CLIENT_ID,
  'clientSecret': process.env.CLIENT_SECRET,
  'username': process.env.REDDITUSERNAME,
  'password': process.env.PASSWORD
};

// twitter
const twitterOptions = {
  'consumer_key': process.env.CONSUMER_KEY,
  'consumer_secret': process.env.CONSUMER_SECRET,
  'access_token': process.env.ACCESS_TOKEN,
  'access_token_secret': process.env.ACCESS_TOKEN_SECRET
};

// instances
const reddit = new snoowrap(redditOptions);
const twitter = new twit(twitterOptions);

// exports
module.exports = {
  reddit,
  twitter
};
