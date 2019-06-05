// local modules
const { downloadImg, deleteImg } = require('./files');
const { getHotSubmissions } = require('./reddit');
const {
  addToSubmissionsDb,
  addRandomSubmissionToTweetedDb,
  getRandom,
  deleteSubmissionsDb,
  deleteTweetedDb
} = require('./dbquery');
const { tweetImg } = require('./twitter');

// vars
const subreddit = 'wholesomememes';

// init
async function init() {
  try {
    const postData = await getHotSubmissions(subreddit);
    await addToSubmissionsDb(postData);
    const random = await getRandom();
    console.log(random);
    if (random) {
      // download the img and get the path
      let imgPath = await downloadImg(random);

      if (imgPath) {
        // downloaded
        console.log(`Downloaded: ${random['id']}`);

        // delete it from submissions db
        await deleteSubmissionsDb((submission = random));
        console.log(`Deleted from submissionsDb: ${random['id']}`);

        // tweet it
        if ((await tweetImg((imgPath = imgPath))) === 200) {
          console.log(`Tweeted: ${random['id']}!`);
        }

        // delete it from memes folder
        if (await deleteImg(imgPath)) {
          console.log(`Deleted from memes: ${random['id']}`);
        }

        // add to tweeted db
        if (await addRandomSubmissionToTweetedDb(random)) {
          console.log(`Added to tweetedDb: ${random['id']}`);
        } else {
          console.log(`${random['id']} Is Already Inserted!`);
        }
      } else {
        console.log(`Could not download!: ${random['id']}`);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// exports
module.exports = {
  init,
  deleteTweetedDb
};
