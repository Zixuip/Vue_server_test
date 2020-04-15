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

// 全局mixin
Vue.mixin({
  computed: {
    // 封装一个全局可以用的uploadUrl方法
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    // 封装一个，全局可以获得Authorization的方法，以免有些地方获取不到请求头，导致无法进行相关操作
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})


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
