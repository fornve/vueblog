<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { firebase } from './providers/firebase'
import { mapMutations } from 'vuex'
export default {
  name: 'App',

  data () {
    return {
      //
    }
  },
  methods: {
    ...mapMutations(['setUser']),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user);
      //this.listenUserOrders(user.uid);
    });
  }
}
</script>
