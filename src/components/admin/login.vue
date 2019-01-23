<template>
  <v-container>
    <v-layout row wrap align-center>
      <button v-if="!user" v-on:click="login()">Login</button>
      <button v-if="user" v-on:click="logout()">Logout</button>
      <img :src="user.photoURL" v-if="user" width="30" />
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { firebase } from '../../providers/firebase'
  export default {
    name: "Login",
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      login() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        firebase.auth().getRedirectResult().then(() => {
          //this.$store.dispatch('toggleUser', result.user)
        }).catch(function() {

        });

      },
      logout() {
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          //this.$store.dispatch('logout', null);
        }).catch(function() {
          // An error happened.
        });
      }
    }
  }
</script>

<style scoped>

</style>