import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import BooleanToText from './filters/boolean-to-text'
import BytesToMB from './filters/bytes-to-mb'
import RemoveReadMore from './filters/remove-post-read-more'
import ToDate from './filters/to-date'

Vue.config.productionTip = false

Vue.filter('BooleanToText', BooleanToText)
Vue.filter('BytesToMB', BytesToMB)
Vue.filter('ToDate', ToDate)
Vue.filter('RemoveReadMore', RemoveReadMore)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
