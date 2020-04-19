<template>
  <div>
    <!-- header -->
    <van-nav-bar title="社区线上便利店" fixed></van-nav-bar>

    <!-- 展示区 -->
    <router-view></router-view>

    <!-- tabbar -->
    <van-tabbar v-model="active" route :placeholder="true" fixed>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>

      <van-tabbar-item icon="search" dot to="/category">分类</van-tabbar-item>

      <van-tabbar-item icon="shopping-cart-o" badge="2" to="/shopcart">购物车</van-tabbar-item>

      <van-tabbar-item icon="contact" badge="20" to="/center">个人中心</van-tabbar-item>
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
<style lang="scss">
</style>

