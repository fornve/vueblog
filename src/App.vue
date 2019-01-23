<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{ name: 'home'}">Blog</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'admin'}">Admin</router-link>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',

  data () {
    return {
      //
    }
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
