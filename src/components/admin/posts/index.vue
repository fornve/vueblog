<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <h1>Posts</h1>
      </v-flex>
      <v-flex xs12>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
   export default {
    name: "posts",
    computed: {
      ...mapState({
        posts: state => state.admin.posts.posts
      })
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
      ...mapActions(['admin/posts/getPosts'])
    },
    mounted() {
      this['admin/posts/getPosts']()
    }
  }
</script>

<style scoped>

</style>