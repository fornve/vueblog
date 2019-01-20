import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { firebase, postsCollection } from './providers/firebase'
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
            post.loading = false
            post.exists = doc.exists
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
          loading: true,
          metadata: {
            createdAt: new Date()
          }
        })

        postsCollection.doc(id).get().then(data => {
          if(!data.exists || !data.data().published) {
            commit('setPost', {
              id: id,
              loading: false,
              exists: false,
              metadata: {
                createdAt: new Date()
              }
            })
          } else {
            commit('setPost', {
              id: id,
              loading: false,
              exists: true,
              metadata:  data.data()
            })
          }
        })
      }

    },
    retrieveUser({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        commit('setUser', user)
      });
    }
  }
})
