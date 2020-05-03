import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { setStore } from "../utils/storage";


export default new Vuex.Store({
  state: {
    cartList: [],//加入购物车的商品
    showCart: false
  },
  mutations: {
    ADDCART(state, { goodsId, goodsPrice, goodsName, goodsImg, goodsNum = 1 }) {
      let cart = state.cartList;
      let goods = {
        goodsId,
        goodsPrice,
        goodsName,
        goodsImg
      }
      let falg = true;
      if (cart.length) {
        cart.forEach(item => {
          if (item.goodsId === goodsId) {
            if (item.goodsNum >= 0) {
              falg = false;
              item.goodsNum += goodsNum
            }
          }
        })
      }
      if (!cart.length || falg) {
        goods.goodsNum = goodsNum;
        cart.push(goods)
      }
      state.cartList = cart
      setStore('buyCart', cart)
    }

  },
  actions: {

  },
  modules: {

  }
})