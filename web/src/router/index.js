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
import Info from '../components/member/Info.vue'
import Address from '../components/address/Address.vue'
import AddAddress from '../components/address/AddAddress.vue'
import EditAddress from '../components/address/EditAddress.vue'
import Order from "../components/order/Order.vue"
import OrderWait from "../components/order/OrderWait.vue"
import Detail from "../components/order/Detail.vue"



Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPulic: true } },
  { path: '/register', name: 'register', component: Register, meta: { isPulic: true } },
  { path: '/info', name: 'info', component: Info },
  { path: '/address', name: 'address', component: Address },
  { path: '/addaddress', name: 'addaddress', component: AddAddress },
  { path: '/editaddress/:id', name: 'editaddress', component: EditAddress, props: true },
  { path: '/order', name: 'order', component: Order },
  { path: '/orderWait', name: 'orderwait', component: OrderWait },
  { path: '/order/:id', name: '订单详情', component: Detail, props: true },

  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/search', name: 'search', component: Search },
      { path: '/center', name: 'center', component: Center },
      { path: '/shopcart', name: 'shopcart', component: ShopCart },
      { path: '/category', name: 'category', component: Category, props: true },
      { path: '/goodsinfo/:id', name: 'goodsinfo', component: goodsInfo, props: true },
      { path: '/category/goodslist', name: 'goodslist', component: goodsList },
      { path: '/cart', name: 'cart', component: Cart },

    ]
  },
]
const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (!to.meta.isPulic && !localStorage.token) {
    return next('/login')
  }
  next()
})


export default router
