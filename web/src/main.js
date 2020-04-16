import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

import './style.scss'

// 引入vantui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
