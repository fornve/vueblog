import { mediaCollection } from "../../../providers/firebase";

export default {
  namespaced: true,
  state: {
    medias: [],
    media: {}
  },
  mutations: {
    addMedia: (store, value) => {
      store.medias.push(value);
    },
    resetCurrentMedia: (store) => {
      store.media = {}
    },
    resetMedias: (store) => {
      store.medias = []
    },
    setCurrentMedia: (store, value) => {
      store.media = value;
    },/*
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
    },*/
  },
  actions: {
    getMedias: ({ commit, state }) => {
      mediaCollection
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          commit('resetMedias');
          snapshot.forEach(doc => {
            let media = {}
            media.id = doc.id;
            media.metadata = doc.data();
            commit('addMedia', media);
          });
        })
    },
    createMediaRecord({ commit, state }, media) {
      console.log(media)
      mediaCollection.doc(media.id).set(media.metadata);
    }
  }
}