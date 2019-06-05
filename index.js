// locals
const { tweet, deleteTweetsFromDb } = require('./src/schedule');

// start schedule
tweet.start();
deleteTweetsFromDb.start();
