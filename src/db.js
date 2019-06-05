require('dotenv/config');
const connection = process.env.DB || 'localhost:27017/redditmemes';
const db = require('monk')(connection);

module.exports = db;
