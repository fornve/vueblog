import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import RemoveReadMore from './filters/remove-post-read-more'
import BooleanToText from './filters/boolean-to-text'
import ToDate from './filters/to-date'

Vue.config.productionTip = false

Vue.filter('RemoveReadMore', RemoveReadMore)
Vue.filter('BooleanToText', BooleanToText)
Vue.filter('ToDate', ToDate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
