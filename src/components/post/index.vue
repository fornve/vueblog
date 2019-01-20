<template>
  <v-container>
    <v-layout row wrap align-center>
      <article v-if="validPost()">
        <h1>{{ post.metadata.name }}</h1>
        <p class="post-page-meta">{{ post.metadata.createdAt | ToDate }}</p>
        <div>
          {{ post.metadata.description | RemoveReadMore }}
        </div>
      </article>
      <article v-if="post.loading">
        <h1>Loading...</h1>
      </article>
      <article v-if="!post.loading && !validPost()">
        <h1>Post not found</h1>
      </article>

    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "post",
    computed: {
      ...mapGetters(['post'])
    },
    created() {
      this.$store.dispatch('retrievePost', this.$route.params.id)
    },
    methods: {
      validPost() {
        return this.post.exists;
      }
    }
  }
</script>

<style scoped>

</style>