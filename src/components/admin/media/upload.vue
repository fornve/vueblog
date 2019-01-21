<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn raised class="primary" v-on:click="onPickFile">Upload Image</v-btn>
        <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
        />
      </v-flex>
    </v-layout>
    [{{ uploading.length }}]
    [{{ imageUrl }}]
    <div v-for="image in uploading" :key="image.id">
      <v-layout row>
        abc
        <v-flex xs12 sm6 offset-sm3>
          <img :src="image.url" height="150">
          <div>{{ image.progress }}</div>
          <div>{{ image.totalBytes }}</div>
        </v-flex>
      </v-layout>
    </div>
    yyy
  </div>
</template>

<script>
  import { firebase } from '../../../providers/firebase'
  import uuid from 'uuid'
  import { mapActions, mapState } from 'vuex'
  export default {
    data() {
      return {
        uploading: [{ progress: 'test' }],
        imageUrl: 'null'
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
        let i = 0;
        console.log(file)
        if(!file) {
          return;
        }
        let id = uuid()
        console.log(this)
        console.log(this.uploading)
        this.uploading[i] = { id: id }
        console.log(this.uploading[i]);
        let filename = file.name
        if(filename.lastIndexOf('.') <= 0) {
          return alert('File invalid')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.uploading[i].url = fileReader.result
          this.imageUrl = fileReader.result
          // eslint-disable-next-line
          console.log(fileReader)

          let ref = 'uploads/' + id + filename.slice(filename.lastIndexOf('.'))
          let uploadTask = firebase.storage().ref(ref).put(file)
          uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot)
            this.uploading[i].state = snapshot.state
            this.uploading[i].progress = snapshot.bytesTransferred / snapshot.totalBytes
            this.uploading[i].bytesTransferred = snapshot.bytesTransferred
            this.uploading[i].bytesTotal = snapshot.totalBytes
          })

          uploadTask.then(fileData => {
            // eslint-disable-next-line
            this.uploading[i].state = 'finished'
            this['admin/media/createMediaRecord']({ id: id, metadata: {
                size: fileData.totalBytes,
                createdAt: new Date(),
                createdBy: this.user.uid,
                fullPath: fileData.metadata.fullPath,
                contentType: fileData.metadata.contentType,
                bucket: fileData.metadata.bucket,
                originalFilename: filename
              }})
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