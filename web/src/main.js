import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

import './style.scss'

// 引入vantui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
Vue.prototype.$http = http

// 这个是axios的方法之一
http.interceptors.request.use(function (config) {
  // 在给前端传输消息的时候加一个请求头Authorization
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 全局捕获错误
http.interceptors.response.use(res => {
  return res
}, err => {
  // Vue组件中自带的prototype方法，弹出提示
  if (err.response.data.message) {
    Vue.prototype.$notify({
      type: 'danger',
      message: err.response.data.message,

    })
    // 这里判断返回的错误是否为401,401错误代表当前用户没有登录，则没有对应的localStorage.token，无法通过校验，就会强制跳转到登录界面
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  // console.log(err.response.data.message);//用户不存在
  return Promise.reject(err)
})


//------Vuex
import store from './store'




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
