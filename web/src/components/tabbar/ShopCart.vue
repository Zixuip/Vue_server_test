<template>
  <div>
    <!-- header -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      right-text="更多"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      :placeholder="true"
    ></van-nav-bar>

    <!-- 内容 -->
    <van-swipe-cell>
      <van-card
        num="2"
        price="2999.00"
        desc="最新ipad！等你来抢,限时抢购"
        title="2020IPAD PRO"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <!-- 底部结算 -->
    <div>
      <van-submit-bar :price="599800" button-text="提交订单" @submit="onSubmit" />
    </div>
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
    },
    onSubmit() {
      console.log("ok");
    }
  }
};
</script>
<style lang="scss">
.van-submit-bar {
  margin-bottom: 55px;
}

// swipcell
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>