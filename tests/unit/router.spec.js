import { mount, createLocalVue } from "@vue/test-utils"
import Vuetify from 'vuetify'
import App from "@/App.vue"
import VueRouter from "vue-router"
import routes from "@/router/routes"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuetify)

describe("App", () => {
  it("renders a child component via routing", () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    router.push("/nested-route")

    expect(wrapper.find(NestedRoute).exists()).toBe(true)
  })
})