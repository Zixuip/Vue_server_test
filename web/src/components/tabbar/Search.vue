<template>
  <div>
    <!-- header -->
    <van-nav-bar
      title="搜索"
      left-text="返回"
      right-text="更多"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      :placeholder="true"
    ></van-nav-bar>
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