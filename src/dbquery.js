// db connection
const db = require('./db');

// add hot submissions to submissions db
async function addToSubmissionsDb(submissions) {
  try {
    const submissionsDb = db.get('submissions');
    const tweetedDb = db.get('tweeted');
    for (const submission of submissions) {
      const isSubmission = await submissionsDb.findOne({
        id: submission['id']
      });
      const isTweeted = await tweetedDb.findOne({ id: submission['id'] });
      if (!isSubmission && !isTweeted) {
        await submissionsDb.bulkWrite([{ insertOne: submission }]);
      }
    }
    await db.close();
  } catch (e) {
    console.log(e);
  }
}

// add random submission to tweeted db
async function addRandomSubmissionToTweetedDb(randomSubmission) {
  try {
    const tweetedDb = db.get('tweeted');
    const queryResult = await tweetedDb.findOne({ id: randomSubmission['id'] });
    if (queryResult === null) {
      await tweetedDb.bulkWrite([{ insertOne: randomSubmission }]);
      await db.close();
      return true;
    }
    await db.close();
    return false;
  } catch (e) {
    console.log(e);
  }
}

// delete all submissions from submissions db if not one is passed
async function deleteSubmissionsDb(submission = {}) {
  try {
    const submissionsDb = db.get('submissions');
    await submissionsDb.remove(submission);
    await db.close();
  } catch (e) {
    console.log('DELETING SUBMISSIONDB:', e);
  }
}

// delete all tweeted submissions if not one is passed
async function deleteTweetedDb(tweet = {}) {
  try {
    const tweetedDb = db.get('tweeted');
    await tweetedDb.remove(tweet);
    await db.close();
  } catch (e) {
    console.log('DELETING TWEETEDDB:', e);
  }
}

// get a random from the submissions db
async function getRandom() {
  try {
    const submissionsDb = db.get('submissions');
    const selectedSubmission = await submissionsDb.findOne();
    await db.close();
    return selectedSubmission;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  addToSubmissionsDb,
  addRandomSubmissionToTweetedDb,
  deleteSubmissionsDb,
  deleteTweetedDb,
  getRandom
};
