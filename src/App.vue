<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{ name: 'home'}">Blog</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar
        v-if="user"
        slot="activator"
        size="36px"
      >
        <img
          src="user.imageURL"
          alt="Avatar"
        >
      </v-avatar>
      <router-link :to="{ name: 'admin'}">Admin</router-link>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['retrieveUser']),
    ...mapMutations(['setUser']),
  },
  created() {
    this.retrieveUser()
  }
}
</script>
