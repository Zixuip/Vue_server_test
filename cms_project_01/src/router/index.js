import Vue from 'vue'
import Router from 'vue-router'
import ListGoods from '../view/ListGoods.vue'
import CreateGoods from '../view/CreateGoods.vue'
import EditGoods from '../view/EditGoods.vue'

// 使用Vue-router插件 vue.prototype.$router = Router;
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      redirect: '/goods/index'

    },
    {
      path: '/goods/index',
      name: 'list-good',
      component: ListGoods
    },
    {
      path: '/goods/create',
      name: 'create-good',
      component: CreateGoods
    },
    {
      path: '/goods/:id/edit',
      name: 'edit-good',
      component: EditGoods
    }
  ]
})
