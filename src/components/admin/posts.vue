<template>
  <div>
    <h1>Posts</h1>
    <v-data-table
        :headers="headers"
        :items="posts"
        class="elevation-1"
    >
      <template slot="items" slot-scope="post">
        <td>
          <router-link :to="{ name: 'admin.post.edit', params: { id: post.item.id }}">{{ post.item.metadata.name }}</router-link>
        </td>
        <td>{{ post.item.metadata.createdAt | ToDate }}</td>
        <td>{{ post.item.metadata.createdBy }}</td>
        <td>{{ post.item.metadata.published | BooleanToText }}</td>
      </template>

    </v-data-table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
   export default {
    name: "posts",
    computed: {
      ...mapGetters(['posts'])
    },
    data() {
      return {
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Created At',
            value: 'createdAt'
          },
          {
            text: 'Created By',
            value: 'createdBy'
          },
          {
            text: 'Published',
            value: 'published'
          },
        ]
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