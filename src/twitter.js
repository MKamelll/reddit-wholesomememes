// local modules
const { twitter } = require('./auth');
const { encodeBase64 } = require('./files');

// tweet the img
function tweetImg(imgPath = null) {
  return new Promise((resolve, reject) => {
    twitter.post(
      'media/upload',
      { 'media_data': encodeBase64(imgPath) },
      (err, data, response) => {
        if (err) reject(err);
        if (response.statusCode === 200) {
          const mediaIdStr = data.media_id_string;
          twitter.post(
            'statuses/update',
            { 'media_ids': [mediaIdStr] },
            (err, _, response) => {
              if (err) reject(err);
              resolve(response.statusCode);
            }
          );
        }
      }
    );
  });
}

// exports
module.exports = {
  tweetImg
};
