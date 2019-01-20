<template>
  <div>
    <h1>Posts</h1>
    <table>
      <tr v-for="post in posts" :key="post.id">
        <td>
          <router-link :to="{ name: 'admin.post.edit', params: { id: post.id }}">{{ post.metadata.name }}</router-link>
        </td>
        <td>{{ post.metadata.createdAt }}</td>
        <td>{{ post.metadata.createdBy }}</td>
      </tr>

    </table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
   export default {
    name: "posts",
    computed: {
      ...mapGetters(['posts'])
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