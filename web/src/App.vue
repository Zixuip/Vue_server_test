<template>
  <div id="app">
    <!-- header -->

    <!-- 展示区 -->
    <router-view />
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

<style>
</style>
