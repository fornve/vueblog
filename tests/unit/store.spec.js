import { createLocalVue } from '@vue/test-utils'
import store from '@/store'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('store/user', () => {

  it('Is store initialized and user is false', () => {
    expect(store.state.user).toBeFalsy()
  })

  it('Set user shouls set user', () => {
    let user = { name: 'John', email: 'john@example.com' }
    store.commit('setUser', user)
    expect(store.state.user).toEqual(user)
  })

  it('Posts are being added properly', () => {
    let post1 = { text: 'Post 1' }
    let post2 = { text: 'Post 2' }
    store.commit('addPost', post1)
    store.commit('addPost', post2)
    expect(store.state.posts.length).toEqual(2)
  })

  it('Posts are being added consistently', () => {
    let post1 = { text: 'Post 1' }
    let post2 = { text: 'Post 2' }
    store.commit('addPost', {})
    expect(store.state.posts).toEqual([post1, post2, {}])
  })
})
