import Vue from 'vue'
import Router from 'vue-router'
import Main from '../view/Main.vue'
import ListGoods from '../view/ListGoods.vue'
import EditGoods from '../view/EditGoods.vue'
import CategoriesList from '../view/CategoriesList.vue'
import CategoriesEdit from '../view/CategoriesEdit.vue'
import LunboList from '../view/LunboList.vue'
import LunboEdit from '../view/LunboEdit.vue'

// 使用Vue-router插件 vue.prototype.$router = Router;
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/categories/index',
          name: 'list-category',
          component: CategoriesList
        },
        {
          path: '/categories/create',
          name: 'create-category',
          component: CategoriesEdit
        },
        {
          path: '/categories/edit/:id',
          name: 'edit-category',
          component: CategoriesEdit,
          props: true
        },
        {
          path: '/goods/index',
          name: 'list-good',
          component: ListGoods
        },
        {
          path: '/goods/create',
          name: 'create-good',
          component: EditGoods
        },
        {
          path: '/goods/edit/:id',
          name: 'edit-good',
          component: EditGoods,
          props: true
        },
        {
          path: '/lunbo/index',
          name: 'list-lunbo',
          component: LunboList,
        },
        {
          path: '/lunbo/create',
          name: 'create-lunbo',
          component: LunboEdit,
        },
        {
          path: '/lunbo/edit/:id',
          name: 'edit-lunbo',
          component: LunboEdit,
          props: true
        },



      ]
    },

  ]
})
