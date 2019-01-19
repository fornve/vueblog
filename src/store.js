import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { postsCollection } from './providers/firebase'
export default new Vuex.Store({
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
    updatePostId: (store, value) => {
      store.post.id = value;
    },
    updatePostName: (store, value) => {
      store.post.metadata.name = value;
    },
    updatePostDescription: (store, value) => {
      store.post.metadata.description = value;
    },
  },
  getters: {
    post: store => {
      return store.post;
    },
    user: store => {
      return store.user;
    }
  },
  actions: {
    getPost: (context, id) => {
      // eslint-disable-next-line
      console.log('getting post of id '+ id)
    },
    getPosts: ({ commit }) => {
      postsCollection
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
          commit('resetPosts');
          snapshot.forEach(doc => {
            let post = {}
            post.id = doc.id;
            post.metadata = doc.data();
            commit('addPost', post);
          });
        })

    },
    retrievePost: ({ state, commit }, id) => {
      let post = state.posts.findIndex(x => x.id === id);
      if(!post) {
        post = {}
        /*postsCollection
          .doc(post.id).*/
      }
      commit('setPost', {
        id: id,
        metadata: {
          createdAt: new Date()
          }
        })
    },
    updatePost: ({ state }) => {
      let post = state.post
      post.metadata.updatedAt = new Date()
      post.metadata.updatedBy = state.user.uid
      // eslint-disable-next-line
      console.log(state.post)
      postsCollection
        .doc(post.id)
        .set(post.metadata)
    }
  }
})
