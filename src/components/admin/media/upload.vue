<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn raised class="primry" v-on:click="onPickFile">Upload Image</v-btn>
        <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <img :src="imageUrl" height="150">
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
        imageUrl: null
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
    },
    name: "upload",
    methods: {
      ...mapActions(['admin/media/createMediaRecord']),
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        let id = uuid()
        const files = event.target.files;
        let filename = files[0].name
        if(filename.lastIndexOf('.') <= 0) {
          return alert('File invalid')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
          // eslint-disable-next-line
          console.log(fileReader)

          let ref = 'uploads/' + id + filename.slice(filename.lastIndexOf('.'))
          let uploadTask = firebase.storage().ref(ref).put(files[0])
          uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot)
            console.log(snapshot.state)
          })

          uploadTask.then(fileData => {
          // eslint-disable-next-line
            console.log(fileData)
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
        fileReader.readAsDataURL(files[0])
      }
    }
  }
</script>

<style scoped>

</style>