const sharp = require('sharp')
const os = require('os')
const path = require('path')
const uuid = require('uuid')

module.exports = function(id, filename, thumbnailSize, resizeString, bucket) {
  return new Promise((resolve, reject) => {
    let newFileName = `${resizeString}-${id}`
    let newFileTemp = path.join(os.tmpdir(), newFileName);
    let tempFilePath = path.join(os.tmpdir(), id);

    console.log('Started generation & upload')
    console.log(filename, newFileName, newFileTemp);

    bucket.file(filename).download({
      destination: tempFilePath
    }).then(() => {

      sharp(tempFilePath)
        .resize(parseInt(thumbnailSize.width, 10), parseInt(thumbnailSize.height, 10))
        .toFile(newFileTemp, (err, info) => {
          console.log(err)
          console.log(info)

          if(err) {
            return reject(err)
          }

          let destination = `uploads/${resizeString}/${id}`+ filename.slice(filename.lastIndexOf('.'))

          bucket.upload(newFileTemp, {
            destination: destination,
            public: true,
            metadata: {
              contentType: 'image/jpeg',
              firebaseStorageDownloadTokens: uuid()
            }
          }).then((file) => {

            bucket.file(destination).getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
            }).then(url => {
              console.log(url)
              resolve({ object: destination, url: url });
            })
          }).catch(e => {
            console.log('error uploading file')
            console.log(e)
            reject(e)
          });
        })
    }).catch(e => {
      console.log(e)
      reject('Error downloading file')
    })


  });
}