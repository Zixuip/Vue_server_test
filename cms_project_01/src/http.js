// 配置axios
import axios from 'axios'

// 抛出一个http，然后在main.js里面引用
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
export default http