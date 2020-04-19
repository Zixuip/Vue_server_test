import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/member/Login.vue'
import Register from '../components/member/Register.vue'
import Main from '../views/Main.vue'
import Center from '../components/tabbar/Center.vue'
import Search from '../components/tabbar/Search.vue'
import ShopCart from '../components/tabbar/ShopCart.vue'
import Category from '../components/tabbar/Category.vue'
import goodsInfo from '../components/goods/goodsInfo.vue'
import goodsList from '../components/goods/goodsList.vue'
import Cart from '../components/Cart/Cart.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'login', component: Register },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/search', name: 'search', component: Search },
      { path: '/center', name: 'center', component: Center },
      { path: '/shopcart', name: 'shopcart', component: ShopCart },
      { path: '/category', name: 'category', component: Category },
      { path: '/goodsinfo/:id', name: 'goodsinfo', component: goodsInfo, props: true },
      { path: '/category/goodslist', name: 'goodslist', component: goodsList },
      { path: '/cart', name: 'shopcart', component: Cart },

    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
