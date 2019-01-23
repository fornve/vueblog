<template>
  <v-container>
    <v-layout row wrap align-center>
      <div v-if="!post.metadata">Post is loading</div>
      <v-flex grid-list-xl v-if="post.metadata">
        <v-layout
            wrap
            justify-space-between
        >
          <v-flex xs12>
            <v-form ref="form">
              <v-text-field
                  v-model="name"
                  label="Post name"
              ></v-text-field>
            </v-form>
          </v-flex>

          <v-flex xs12>
            <v-textarea
                v-model="description"
                label="Description"
                auto-grow
            ></v-textarea>
          </v-flex>

          <v-flex xs12>
            <v-checkbox
                v-model="published"
                label="Published"
                data-vv-name="checkbox"
                type="checkbox"
            ></v-checkbox>

            <v-btn color="success" v-on:click="update()">Update</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>

</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
    name: "New",
    computed: {
      ...mapState({
        post: state => state.admin.posts.post
      }),
      ...mapGetters(['user']),
      name: {
        set(value) {
          this.$store.commit('admin/posts/updatePostName', value)
        },
        get() {
          return this.post.metadata.name;
        }
      },
      description: {
        set(value) {
          this.$store.commit('admin/posts/updatePostDescription', value)
        },
        get() {
          return this.post.metadata.description;
        }
      },
      published: {
        set(value) {
          this.$store.commit('admin/posts/updatePostPublished', value)
        },
        get() {
          return this.post.metadata.published;
        }
      },

    },
    methods: {
      ...mapActions(['admin/posts/retrievePost', 'admin/posts/updatePost']),
      update() {
        this['admin/posts/updatePost'](this.user.uid)
      }
    },
    mounted() {
      this['admin/posts/retrievePost'](this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>