<template>
  <div>
    <!-- header -->
    <van-nav-bar title="社区线上便利店" fixed></van-nav-bar>

    <!-- 展示区 -->
    <router-view></router-view>

    <!-- tabbar -->
    <van-tabbar v-model="active" route :placeholder="true" fixed>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>

      <van-tabbar-item icon="apps-o" to="/category">全部</van-tabbar-item>

      <van-tabbar-item icon="shopping-cart-o" to="/shopcart">购物车</van-tabbar-item>

      <van-tabbar-item icon="contact" to="/center">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {}
};
</script>
<style>
</style>

