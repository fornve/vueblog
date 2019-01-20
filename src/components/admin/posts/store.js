import {postsCollection} from "../../../providers/firebase";

export default {
  namespaced: true,
  state: {
    posts: [],
    post: {}
  },
  getters: {
    post: store => {
      return store.post;
    },
    posts: store => {
      return store.posts;
    }
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
    updatePostId: (store, value) => {
      store.post.id = value;
    },
    updatePostName: (store, value) => {
      store.post.metadata.name = value;
    },
    updatePostDescription: (store, value) => {
      store.post.metadata.description = value;
    },
    updatePostPublished: (store, value) => {
      store.post.metadata.published = value;
    },
  },
  actions: {
    getPosts: ({ commit, state }) => {
      postsCollection
        .orderBy('createdAt', 'desc')
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

      if (post) {
        commit('setPost', Object.assign({}, post))
      } else {
        commit('setPost', {
          id: id,
          loading: true,
          metadata: {
            createdAt: new Date()
          }
        })
      }
    },
    updatePost: ({ state }, userId ) => {
      let post = state.post
      post.metadata.updatedAt = new Date()
      post.metadata.updatedBy = userId
      postsCollection
        .doc(post.id)
        .set(post.metadata)
    }
  }
}