import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Center from '../components/tabbar/Center.vue'
import Search from '../components/tabbar/Search.vue'
import ShopCart from '../components/tabbar/ShopCart.vue'
import Category from '../components/tabbar/Category.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },

    ]
  },
  { path: '/search', name: 'search', component: Search },
  { path: '/center', name: 'center', component: Center },
  { path: '/shopcart', name: 'shopcart', component: ShopCart },
  { path: '/category', name: 'category', component: Category },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
