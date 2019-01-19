<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <div>
        <router-link :to="{ name: 'post', params: { id: post.id }}">
          <h2>{{ post.metadata.name }}</h2>
          <div>{{ post.metadata.description }}</div>
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
      ...mapGetters(['posts'])
    }
  }
</script>

<style scoped>

</style>