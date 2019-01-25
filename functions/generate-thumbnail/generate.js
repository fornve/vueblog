const sharp = require('sharp')
const os = require('os')
const path = require('path')

module.exports = function(id, filename, thumbnailSize, resizeString, bucket) {
  return new Promise((resolve, reject) => {
    let newFileName = `${resizeString}/${id}.png`
    let newFileTemp = path.join(os.tmpdir(), newFileName);

    sharp(filename)
      .resize(thumbnailSize.width, thumbnailSize.height)
      .toFile(newFileTemp, (err, info) => {
        console.log(err)
        console.log(info)
        if(err) {
          reject(err)
        }
        bucket.upload(newFileTemp, {
          destination: newFileName
        }).then(() => {
          resolve();
        }).catch(e => {
          console.log('error uploading file')
          console.log(e)
          reject(e)
        });
      })

  });
}