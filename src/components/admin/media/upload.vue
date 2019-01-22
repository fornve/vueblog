<template>
  <div>
    <v-layout row>
      <v-flex xs3>
        <v-btn raised class="primary" v-on:click="onPickFile">Upload Image</v-btn>
        <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
        />
      </v-flex>
      <v-flex xs6 v-if="uploading">
        [{{ uploading.id }}][{{ uploading.url }}]
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <img :src="uploading.url" height="150">
            <div>
              <v-progress-circular :value="uploading.progress"></v-progress-circular>
            </div>
            <div>{{ uploading.bytesTotal }}</div>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { firebase } from '../../../providers/firebase'
  import uuid from 'uuid'
  import { mapActions, mapState } from 'vuex'
  export default {
    data() {
      return {
        uploading: false,
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    name: "upload",
    methods: {
      ...mapActions(['admin/media/createMediaRecord']),
      onFilePicked(event) {
        const file = event.target.files[0];
        let uploading = this.uploading

        if(!file) {
          return;
        }
        let id = uuid()
        uploading = { id: id, progress: 0 }
        let filename = file.name
        if(filename.lastIndexOf('.') <= 0) {
          return alert('File invalid')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          uploading.url = fileReader.result

          let ref = 'uploads/' + id + filename.slice(filename.lastIndexOf('.'))
          let uploadTask = firebase.storage().ref(ref).put(file)
          uploadTask.on('state_changed', (snapshot) => {
            uploading.state = snapshot.state
            uploading.progress = Math.round( 100 * snapshot.bytesTransferred / snapshot.totalBytes )
            uploading.bytesTransferred = snapshot.bytesTransferred
            uploading.bytesTotal = snapshot.totalBytes
          })

          uploadTask.then(fileData => {
            firebase.storage().ref(ref).getDownloadURL().then((downloadUrl) => {
              uploading.state = 'finished'
              this['admin/media/createMediaRecord']({ id: id, metadata: {
                  size: fileData.totalBytes,
                  createdAt: new Date(),
                  createdBy: this.user.uid,
                  downloadUrl: downloadUrl,
                  fullPath: fileData.metadata.fullPath,
                  contentType: fileData.metadata.contentType,
                  bucket: fileData.metadata.bucket,
                  originalFilename: filename
                }})

            });
          })
        })
        fileReader.readAsDataURL(file)
      },
      onPickFile() {
        this.$refs.fileInput.click()
      }
    }
  }
</script>

<style scoped>

</style>