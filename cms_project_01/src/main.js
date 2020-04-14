// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 使用Mint-UI引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
import './plugins/element.js'

import http from './http'
Vue.prototype.$http = http


/* 第二种配置
import Axios from 'axios'
// 配置公共的URL
/* Axios.defaults.baseURL = 'http://localhost:3000/api'
// 配置axios
Vue.prototype.$axios = Axios */


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
