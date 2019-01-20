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
        set(name) {
          this.$store.commit('updatePostName', name)
        },
        get() {
          return this.post.metadata.name;
        }
      },
      description: {
        set(description) {
          this.$store.commit('updatePostDescription', description)
        },
        get() {
          return this.post.metadata.description;
        }
      }
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