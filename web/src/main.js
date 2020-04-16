import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
