const functions = require('firebase-functions');
exports.processImage = functions.database.ref('/media/{id}').onCreate(async (data) => {
  console.log(JSON.stringify(data.data()))
  return null;
});