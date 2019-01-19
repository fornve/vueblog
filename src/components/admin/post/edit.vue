<template>
  <form action="#" v-on:submit.prevent>
    <label>
      <input v-model="name" placeholde="Name" />
    </label>
    <label>
      <textarea v-model="description" placeholder="Description" />
    </label>
    <button v-on:click="update()">Update</button>
  </form>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "New",
    computed: {
      ...mapGetters(['post', 'user']),
      name: {
        set(name) {
          this.$store.commit('updatePostName', name)
        },
        get() {
          return this.post.name;
        }
      },
      description: {
        set(description) {
          this.$store.commit('updatePostDescription', description)
        },
        get() {
          return this.post.description;
        }
      }
    },
    methods: {
      ...mapActions(['retrievePost', 'updatePost']),
      update() {
        this.updatePost()
      }
    },
    mounted() {
      this.retrievePost(this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>