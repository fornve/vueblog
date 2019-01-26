<template>
  <v-container v-if="media && media.metadata">
    <v-layout>
      <v-flex xs6>
        <img :src="getThumb200x200()" />
      </v-flex>
      <v-flex xs6>
        <v-data-table
          :items="getImageDetails()"
          class="elevation-1"
          hide-headers
          hide-actions
        >
          <template slot="items" slot-scope="item">
            <td>{{ item.item.name }}</td>
            <td>{{ item.item.value }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12>
        <v-btn color="error" v-on:click="deleteMedia()">Delete</v-btn>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12>Generate thumbnail (resize)</v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs3>
        <v-text-field
            v-model="width"
            label="width"
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
            v-model="height"
            label="height"
        ></v-text-field>

      </v-flex>
      <v-flex xs6>
        <v-btn color="success" v-on:click="generate()">Generate</v-btn>
        <v-btn color="error" v-on:click="test()">Test</v-btn>
      </v-flex>
    </v-layout>

    <v-layout v-if="media.metadata.thumbnails">
      <div v-for="(thumb, key) in media.metadata.thumbnails" :key="key">
        <div><img :src="thumb.url" :alt="thumb.url" /></div>
      </div>
    </v-layout>

  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { firebase } from '../../../providers/firebase'
  export default {
    name: "admin-post-edit",
    data() {
      return {
        thumbnail: {
          width: '',
          height: ''
        }
      }
    },
    computed: {
      ...mapState({
        media: state => state.admin.media.media
      }),
      width: {
        set(value) {
          this.thumbnail.width = value;
        },
        get() {
          return this.thumbnail.width;
        }
      },
      height: {
        set(value) {
          this.thumbnail.height = value;
        },
        get() {
          return this.thumbnail.height;
        }
      },
    },
    methods: {
      ...mapActions(['admin/media/retrieveMedia', 'messages/emit']),
      deleteMedia() {

        firebase.functions()
          .httpsCallable('deleteMedia')
          .deleteMedia({id: this.media.id})
          .then(() => {
            this['messages/emit']({
              type: 'info',
              message: 'Media & thumbnails of ' + this.media.metadata.originalFilename + ' deleted'
            })
            this.$route.redirect({name: 'admin.media'})
          })
          .catch(e => {
            console.log(e)
          })
      },
      generate() {

        firebase.functions()
          .httpsCallable('generateThumbnail')({id: this.media.id, data: this.thumbnail})
          .then(() => {
            this.thumbnail = {
              width: '',
              height: ''
            }
          })
          .catch(e => {
            console.log(e)
          })

      },
      getImageDetails() {
        let table = [
          {
            name: 'Id',
            value: this.media.id
          },
          {
            name: 'Filename',
            value: this.media.metadata.originalFilename
          },
          {
            name: 'Size',
            value: this.$options.filters.BytesToMB(this.media.metadata.size) + ' MB'
          },
          {
            name: 'Tags',
            value: this.getMlVisionTags()
          },

        ];
        return table;
      },
      getMlVisionTags() {
        let tags = [];
        this.media.metadata.mlVision.labelAnnotations.forEach(item => {
          tags.push(item.description)
        })
        return tags.join(', ');
      },
      getThumb200x200() {
        if(this.media.metadata.thumbnails && this.media.metadata.thumbnails['200x200']) {
          return this.media.metadata.thumbnails['200x200'].url
        }
      }
    },
    mounted() {
      this['admin/media/retrieveMedia'](this.$route.params.id)

      if(!this.media.metadata) {
        return false
      }

      if(!this.media.metadata.thumbnails || !this.media.metadata.thumbnails['200x200']) {
        firebase.functions()
          .httpsCallable('generateThumbnail')({id: this.media.id, data: {width: 200, height: 200}})
      }
    }
  }
</script>

<style scoped>

</style>