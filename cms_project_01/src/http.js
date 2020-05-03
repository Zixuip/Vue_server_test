// 配置axios
import axios from 'axios'
import Vue from 'vue'
import router from './router'

// 抛出一个http，然后在main.js里面引用
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
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
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    // 这里判断返回的错误是否为401,401错误代表当前用户没有登录，则没有对应的localStorage.token，无法通过校验，就会强制跳转到登录界面
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  // console.log(err.response.data.message);//用户不存在
  return Promise.reject(err)
})
export default http