<template>
  <div>
    <h1>Posts</h1>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
   export default {
    name: "posts",
    computed: {
      ...mapGetters(['posts'])
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