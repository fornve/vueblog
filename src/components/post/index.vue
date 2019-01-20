<template>
  <v-container>
    <v-layout row wrap align-center>
      <article>
        <h1>{{ post.metadata.name }}</h1>
        <p class="post-page-meta">{{ post.metadata.createdAt }}</p>
        <div>
          {{ post.metadata.description | RemoveReadMore }}
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
      this.$store.dispatch('retrievePost', this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>