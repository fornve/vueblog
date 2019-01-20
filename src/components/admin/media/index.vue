<template>
  <div>
    <h1>Media</h1>
    <Upload />
    <v-data-table
        :headers="headers"
        :items="medias"
        class="elevation-1"
    >
      <template slot="items" slot-scope="media">
        <td>
          {{ media.item.metadata.filename }}
          <br />
          {{ media.id }}
        </td>
        <td>{{ media.item.metadata.createdAt | ToDate }}</td>
        <td>{{ media.item.metadata.createdBy }}</td>
        <td>{{ media.item.metadata.published | BooleanToText }}</td>
      </template>

    </v-data-table>
  </div>
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
            text: 'Filename',
            value: 'filename'
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
            text: 'Published',
            value: 'published'
          },
        ]
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