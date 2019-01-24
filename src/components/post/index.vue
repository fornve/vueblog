<template>
  <v-container>
    <v-layout row wrap align-center>
      <article v-if="validPost()">
        <h1>{{ post.metadata.name }}</h1>
        <p class="post-page-meta">{{ post.metadata.createdAt | ToDate }}</p>
        <div v-html="getFormattedPostDescription()"></div>
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
  import marked from 'marked'
  export default {
    name: "post",
    computed: {
      ...mapGetters(['post'])
    },
    created() {
      this.$store.dispatch('retrievePost', this.$route.params.id)
    },
    methods: {
      getFormattedPostDescription() {
        let text = this.$options.filters.RemoveReadMore(this.post.metadata.description)

        if(this.post.metadata.markupType == 'Markup') {
          text = marked(text) +
            ' <!-- marked! -->'
        }
console.log(text)
        return text;
      },
      validPost() {
        return this.post.exists;
      }
    }
  }
</script>

<style scoped>

</style>