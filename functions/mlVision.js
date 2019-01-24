const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

module.exports = functions.https.onRequest((req, res) => {
  let filename = 'gs://vueblogawesome.appspot.com/uploads/244d1677-2db8-4718-aff4-f982ce5d8d60.jpg'
  client.labelDetection(filename).then((results) => {
    console.log(results)
    res.send(JSON.stringify(results));
  }).catch(e => {
    console.log(e)
    res.send(e);
  })
});