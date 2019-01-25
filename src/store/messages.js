export default {
  state: {
    items: []
  },
  mutations: {
    emit: (store, value) => {
      store.items.push(value);
    },
  },
  actions: {},
  namespaced: true
}