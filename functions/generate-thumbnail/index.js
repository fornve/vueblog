const functions = require('firebase-functions')
const admin = require('firebase-admin')
const generateThumbnail = require('./generate')
const app = admin.initializeApp(functions.config().firebase)
let db = admin.firestore()
let bucket = admin.storage().bucket()
db.settings({timestampsInSnapshots: true})

const generateResizeSting = function(thumbnail) {
  let result = []
  Object.keys(thumbnail).forEach(key => {
    result.push(thumbnail[key])
  })
  return result.join('x')
}

module.exports = functions.https.onCall((data) => {
  console.log(data)
  let resizeString = generateResizeSting(data.data)
  console.log(resizeString)
  return new Promise((resolve, reject) => {
    db.collection('/media')
      .doc(data.id)
      .get()
      .then(doc => {
        let metadata = doc.data();
        console.log(metadata);

        // Check if thumbnail already exists
        if(metadata.thumbnails && metadata.thumbnails[resizeString]) {
          return resolve(metadata.thumbnails[resizeString]);
        }

        if(!metadata.thumbnails) {
          metadata.thumbnails = {};
        }

        generateThumbnail(doc.id, metadata.fullPath, data.data, resizeString, bucket)
          .then(result => {
            metadata.thumbnails[resizeString] = result;
            db.collection('/media').doc(data.id).set(metadata).then(() => {
              return resolve(metadata.thumbnails[resizeString])
            })
          }).catch(e => {
            console.log(e)
            reject('Error generating thumbnail')
        })

      }).catch(e => {
        reject(e)
      })
  })
});
