<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12 v-for="post in publishedPosts" :key="post.id">
        <article>
          <router-link :to="{ name: 'post', params: { id: post.id }}">
            <h2>{{ post.metadata.name }}</h2>
            <div>{{ post.metadata.description | ApplyReadMore }}</div>
          </router-link>
        </article>
        <hr />
      </v-flex>

      </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "index",
    computed: {
      ...mapGetters(['publishedPosts'])
    },
    filters: {
      ApplyReadMore: (text) => {
        let readMore = text.indexOf('<!--more-->')
        return text.substring(0, readMore > 0 ? readMore : text.length)
      }
    },
    methods: {
      ...mapActions(['getPosts'])
    },
    mounted() {
      this.getPosts()
    }
  }
</script>

<style scoped>

</style>