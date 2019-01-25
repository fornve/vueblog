const sharp = require('sharp')
const os = require('os')
const path = require('path')
const uuid = require('uuid')

module.exports = function(id, filename, thumbnailSize, resizeString, storage) {
  return new Promise((resolve, reject) => {
    let newFileName = `${resizeString}-${id}`
    let newFileTemp = path.join(os.tmpdir(), newFileName);
    let tempFilePath = path.join(os.tmpdir(), id);

    console.log('Started generation & upload')
    console.log(filename, newFileName, newFileTemp);

    storage.bucket().file(filename).download({
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

          storage.bucket().upload(newFileTemp, {
            destination: destination,
            public: true,
            metadata: {
              contentType: 'image/jpeg',
              cacheControl: 'public, max-age=31536000',
              gzip: true,
              predefinedAcl: 'publicRead',
            }
          }).then((file, z) => {
            //storage.ref(destination).getDownloadURL().then(url => {
           // let metadata = file[0].getMetadata()
            //console.log(metadata)
              console.log(file[0])
            console.log(file[1])
              resolve({ object: destination, url: file[1].mediaLink });
            //})
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