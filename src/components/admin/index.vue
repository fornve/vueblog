<template>
  <div>
    <div v-if="!user">
      <Login />
    </div>
    <div v-if="user">
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
      </ul>

      <router-view />
    </div>
  </div>
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