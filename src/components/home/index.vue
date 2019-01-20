<template>
  <div>
    <div v-for="post in publishedPosts" :key="post.id">
      <div>
        <router-link :to="{ name: 'post', params: { id: post.id }}">
          <h2>{{ post.metadata.name }}</h2>
          <div>{{ post.metadata.description | ApplyReadMore }}</div>
        </router-link>
      </div>
      <hr />
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
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
    }
  }
</script>

<style scoped>

</style>