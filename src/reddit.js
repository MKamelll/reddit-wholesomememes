// dependencies
const { reddit } = require('./auth');

// get ids of sticky submissions to avoid
async function getHotSubmissions(subreddit, limit = 10) {
  try {
    let hotSubmissions = await reddit
      .getSubreddit(subreddit)
      .getHot({ limit: limit });
    const hotSubmissionsData = getPostData(hotSubmissions);
    return hotSubmissionsData;
  } catch (error) {
    console.log('MYREDDIT:', error);
  }
}

// return object with id, imgurls, created time
function getPostData(hotSubmissions) {
  return hotSubmissions.reduce((postData, submission) => {
    if (!submission['stickied'] && submission['preview']['images']) {
      const submissionId = submission['id'];
      const subredditName = submission['subreddit_name_prefixed'];
      const submissionImgURL =
        submission['preview']['images'][0]['source']['url'];
      const submissionCreatedUnix = submission['created_utc'];
      const post = {
        id: submissionId,
        subredditName,
        imgURL: submissionImgURL,
        created: `${parseInt(
          (new Date() - new Date(submissionCreatedUnix * 1000)) / 3.6e6
        )}hrs`
      };
      postData.push(post);
    }
    return postData;
  }, []);
}

module.exports = {
  getHotSubmissions
};
