import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/assets/base.css'
import 'mint-ui/lib/style.css'


import axios from 'axios'
axios.defaults.baseURL= '/api/'
Vue.prototype.$axios = axios

// 图片过滤
Vue.filter('filterImg',function(input) {
  return input.replace(/{size}/,'400')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
