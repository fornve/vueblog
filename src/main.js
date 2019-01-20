import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import RemoveReadMore from './filters/remove-post-read-more'

Vue.config.productionTip = false

Vue.filter('RemoveReadMore', RemoveReadMore)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
