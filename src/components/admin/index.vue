<template>
  <v-container fluid>
    <v-layout v-if="!user">
      <Login />
    </v-layout>
    <v-layout v-if="user">
      <ul>
        <li>
          <router-link :to="{ name: 'admin.posts' }">
            <button>Posts</button>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin.post.edit', params: { id: uuid() }}">
            <button>Add post</button>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin.media' }">
            <button>Media</button>
          </router-link>
        </li>
      </ul>

    </v-layout>
    <v-layout>
      <router-view />
    </v-layout>
  </v-container>
</template>

<script>
  import uuid from 'uuid'
  import Login from './login'
  import { mapGetters } from 'vuex'
  export default {
    name: "index",
    computed: {
      ...mapGetters(['user'])
    },
    components: {
      Login
    },
    methods: {
      uuid() {
        return uuid()
      }
    }
  }
</script>

<style scoped>

</style>