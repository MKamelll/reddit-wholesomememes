// dependencies
const { CronJob } = require('cron');
// locals
const { init, deleteTweetedDb } = require('./app');

// schedule tweeting every hour
const tweet = new CronJob('0 */1 * * *', () => {
  console.log("Let's make some noise!");
  init();
});

// schedule deleting all tweeted after a week
const deleteTweetsFromDb = new CronJob('0 * * * */7', () => {
  console.log('Gotta delete those!');
  deleteTweetedDb();
});

module.exports = {
  tweet,
  deleteTweetsFromDb
};
