<template>
  <div>
    <!-- header -->
    <van-nav-bar
      title="社区线上便利店"
      left-text="返回"
      right-text="分类"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      :placeholder="true"
    ></van-nav-bar>
    <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词" input-align="center" class="search" />

    <!-- swiper -->
    <van-swipe :autoplay="3000">
      <van-swipe-item>
        <img src="../assets/swpier/pic1.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/swpier/pic2.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/swpier/pic3.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/swpier/pic4.jpg" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 展示区 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  width: 100%;
}
</style>

