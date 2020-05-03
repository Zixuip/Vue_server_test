import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/Login.vue'
import Main from '../view/Main.vue'
import ListGoods from '../view/ListGoods.vue'
import EditGoods from '../view/EditGoods.vue'
import CategoriesList from '../view/CategoriesList.vue'
import CategoriesEdit from '../view/CategoriesEdit.vue'
import AdList from '../view/AdList.vue'
import AdEdit from '../view/AdEdit.vue'
import AdminUserList from '../view/AdminUserList.vue'
import AdminUserEdit from '../view/AdminUserEdit.vue'
import UserList from '../view/UserList.vue'
import UserEdit from '../view/UserEdit.vue'
import assert from 'http-assert'

// 使用Vue-router插件 vue.prototype.$router = Router;
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPulic: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/index', component: CategoriesList },
        { path: '/categories/create', component: CategoriesEdit },
        { path: '/categories/edit/:id', component: CategoriesEdit, props: true },

        { path: '/goods/index', component: ListGoods },
        { path: '/goods/create', component: EditGoods },
        { path: '/goods/edit/:id', component: EditGoods, props: true },

        { path: '/ads/index', component: AdList, },
        { path: '/ads/create', component: AdEdit, },
        { path: '/ads/edit/:id', component: AdEdit, props: true },

        { path: '/admin_user/index', component: AdminUserList, },
        { path: '/admin_user/create', component: AdminUserEdit, },
        { path: '/admin_user/edit/:id', component: AdminUserEdit, props: true },

        { path: '/user/index', component: UserList, },
        { path: '/user/create', component: UserEdit, },
        { path: '/user/edit/:id', component: UserEdit, props: true },



      ]
    },

  ]
})

// 路由守卫：在上方添加一个meta: { isPulic: true },然后判断当前路由信息是否存在isPulic和token，都没有就强制跳转login
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (!to.meta.isPulic && !localStorage.token) {
    alert('请先登录')
    return next('/login')
  }
  next()
})
export default router
