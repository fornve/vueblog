const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

module.exports = functions.firestore.document('/media/{id}')
  .onCreate((snap) => {
    return new Promise((resolve, reject) => {
      let data = snap.data()
      client.labelDetection(data.downloadUrl).then((results) => {
        data.mlVision = results[0]
        resolve(snap.ref.set(data));
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  });
