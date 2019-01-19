<template>
  <v-container>
    <v-layout row wrap align-center>
      <article>
        <h1>{{ post.title }}</h1>
        <p class="post-page-meta">{{ post.date }}</p>
        <div>
          {{ post.content }}
        </div>
      </article>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "post",
    computed: {
      ...mapGetters(['post'])
    },
    created() {
      this.$store.dispatch('getPost', this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>