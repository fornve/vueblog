import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/components/admin/login.vue'
import store from '@/store'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App/admin/login', () => {

  it('Renders login button initially, logout is hidden', () => {
    const login = 'Login'
    const logout = 'Logout'
    const wrapper = shallowMount(Login, { store, localVue });
    expect(wrapper.text()).toMatch(login)
    expect(wrapper.text()).not.toMatch(logout)
  })

  it('Renders logout button when user is logged in, login is hidden', () => {
    const login = 'Login'
    const logout = 'Logout'
    const wrapper = shallowMount(Login, { store, localVue });
    store.commit('setUser', { name: 'Just Testing'});
    expect(wrapper.text()).not.toMatch(login)
    expect(wrapper.text()).toMatch(logout)
  })
})
