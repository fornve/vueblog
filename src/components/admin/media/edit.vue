<template>
  <v-container v-if="media && media.metadata">
    <v-layout>
      <v-flex xs12>
        <img :src="media.metadata.downloadUrl" style="width: 40px" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>Render thumbnail</v-flex>
      <v-flex xs12>
        <v-text-field
            v-model="width"
            label="width"
        ></v-text-field>
        <v-text-field
            v-model="height"
            label="height"
        ></v-text-field>

      </v-flex>
      <v-flex xs12>
        <v-btn color="success" v-on:click="create()">Update</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
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
      ...mapActions(['admin/media/retrieveMedia']),
      create() {
        this.thumbnail = {
          width: '',
            height: ''
        }
      }
    },
    mounted() {
      this['admin/media/retrieveMedia'](this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>