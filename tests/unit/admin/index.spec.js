import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Index from '@/components/admin/index.vue'
import store from '@/store'
import router from '@/router/index'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('App/admin/index', () => {

  it('Route is hidden for not logged in users', () => {
    const wrapper = shallowMount(Index, { store, localVue });
    expect(wrapper.text()).toMatch('')
    expect(wrapper.text()).not.toMatch('Posts')
  })

  it('Renders logout button when user is logged in, login is hidden', () => {
    const wrapper = shallowMount(Index, { store, localVue });
    store.commit('setUser', { name: 'Just Testing'});
    expect(wrapper.text()).not.toMatch('Login')
    expect(wrapper.text()).toMatch('Posts Add post Media')
  })
})
