import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: false,
    post: {},
    posts: []
  },
  mutations: {
    setPost: (store, value) => {
      store.post = value;
    }
  },
  getters: {
    post: store => {
      return store.post;
    }
  },
  actions: {
    getPost: (context, id) => {
      // eslint-disable-next-line
      console.log('getting post of id '+ id)
    }
  }
})
