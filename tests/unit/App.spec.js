import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import router from '@/router/index'
import Login from '@/App.vue'
import store from '@/store'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('App', () => {

  it('Renders something', () => {
    const wrapper = shallowMount(Login, { store, localVue });
  })

})
