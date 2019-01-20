import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { postsCollection } from './providers/firebase'
import Admin from './components/admin/store'
export default new Vuex.Store({
  modules: {
    admin: Admin
  },
  state: {
    user: false,
    post: {},
    posts: []
  },
  mutations: {
    addPost: (store, value) => {
      store.posts.push(value);
    },
    resetPost: (store) => {
      store.post = {}
    },
    resetPosts: (store) => {
      store.posts = []
    },
    setPost: (store, value) => {
      store.post = value;
    },
    setUser: (store, value) => {
      store.user = value;
    },
  },
  getters: {
    post: store => {
      return store.post;
    },
    posts: store => {
      return store.posts;
    },
    publishedPosts: store => {
      return store.posts.filter(x => x.metadata.published);
    },
    user: store => {
      return store.user;
    }
  },
  actions: {
    getPosts: ({ commit, state }) => {
      postsCollection
        .orderBy('createdAt', 'desc')
        .where('published', '==', true)
        .onSnapshot((snapshot) => {
          commit('resetPosts');
          snapshot.forEach(doc => {
            let post = {}
            post.id = doc.id;
            post.metadata = doc.data();
            commit('addPost', post);

            // update current posts
            if(state.post.id === post.id) {
              commit('setPost', post);
            }
          });
        })

    },
    retrievePost: ({ state, commit }, id) => {
      let post = state.posts.find(x => x.id === id);

      if(post) {
        commit('setPost', Object.assign({}, post))
      } else {
        commit('setPost', {
          id: id,
          metadata: {
            createdAt: new Date()
          }
        })
      }

    }
  }
})
