// dependencies
const fs = require('fs');
const fetch = require('node-fetch');

// save the img file from the link
async function downloadImg(submission) {
  try {
    const fileName = submission['id'];
    const imgURL = submission['imgURL'];
    const imgPath = `./memes/${fileName}.jpg`;
    const imgFile = fs.createWriteStream(imgPath);
    const response = await fetch(imgURL);
    if (response.status === 200) {
      response.body.pipe(imgFile);
      return imgPath;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

// encode base64
function encodeBase64(imgPath) {
  const base64Content = fs.readFileSync(imgPath, { encoding: 'base64' });
  return base64Content;
}

// delete the img
function deleteImg(imgPath) {
  return new Promise((resolve, reject) => {
    fs.unlink(imgPath, err => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

module.exports = {
  downloadImg,
  encodeBase64,
  deleteImg
};
