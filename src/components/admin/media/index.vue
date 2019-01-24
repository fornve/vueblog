<template>
  <v-flex>
    <h1>Media</h1>
    <Upload />
    <v-data-table
        :headers="headers"
        :items="medias"
        class="elevation-1"
    >
      <template slot="items" slot-scope="media">
        <td>
          <router-link :to="{ name: 'admin.media.edit', params: { id: media.item.id }}">
            <img :src="media.item.metadata.downloadUrl" style="width: 40px" />
          </router-link>
        </td>
        <td>
          {{ media.item.id }}
        </td>
        <td>
          <div v-if="media.item.metadata.mlVision">
            <ul
                v-for="item in media.item.metadata.mlVision.labelAnnotations"
                :key="item.description">
              <li>{{ item.description }} - {{ item.score }}</li>
            </ul>
          </div>

        </td>
        <td>{{ media.item.metadata.createdAt | ToDate }}</td>
        <td>{{ media.item.metadata.createdBy }}</td>
        <td>{{ media.item.metadata.size | BytesToMB }} MB</td>
      </template>

    </v-data-table>
  </v-flex>
</template>

<script>
  import Upload from './upload'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'admin-media-upload',
    components: { Upload },
    computed: {
      ...mapState({
        medias: state => state.admin.media.medias
      })
    },
    data() {
      return {
        headers: [
          {
            text: '',
            value: 'img'
          },
          {
            text: 'Filename',
            value: 'filename'
          },
          {
            text: 'Labels',
            value: 'labels'
          },
          {
            text: 'Created At',
            value: 'createdAt'
          },
          {
            text: 'Created By',
            value: 'createdBy'
          },
          {
            text: 'Size',
            value: 'size'
          },
        ]
      }
    },
    filters: {
      BytesToMB: (value) => {
        return Math.round(1000 * value / (1024 *1024)) / 1000;
      }
    },
    methods: {
      ...mapActions(['admin/media/getMedias'])
    },
    mounted() {
      this['admin/media/getMedias']()
    }
  }
</script>

<style scoped>

</style>