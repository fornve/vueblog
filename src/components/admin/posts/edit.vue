<template>
  <div>
    <div v-if="!post.metadata">Post is loading</div>
    <v-container grid-list-xl v-if="post.metadata">
      <v-layout
          wrap
          justify-space-between
      >
        <v-flex
            xs12
            md4
        >
          <v-form ref="form">
            <v-text-field
                v-model="name"
                label="Post name"
            ></v-text-field>
          </v-form>
        </v-flex>

        <v-flex
            xs12
            md6
        >
          <v-textarea
              v-model="description"
              label="Description"
              auto-grow
          ></v-textarea>
        </v-flex>

        <v-flex
            xs12
            md6
        >
          <v-checkbox
              v-model="published"
              label="Published"
              data-vv-name="checkbox"
              type="checkbox"
          ></v-checkbox>

          <v-btn color="success" v-on:click="update()">Update</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "New",
    computed: {
      ...mapGetters(['post', 'user']),
      name: {
        set(value) {
          this.$store.commit('updatePostName', value)
        },
        get() {
          return this.post.metadata.name;
        }
      },
      description: {
        set(value) {
          this.$store.commit('updatePostDescription', value)
        },
        get() {
          return this.post.metadata.description;
        }
      },
      published: {
        set(value) {
          this.$store.commit('updatePostPublished', value)
        },
        get() {
          return this.post.metadata.published;
        }
      },

    },
    methods: {
      ...mapActions(['retrievePost', 'updatePost']),
      update() {
        this.updatePost()
      }
    },
    mounted() {
      this.retrievePost(this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>