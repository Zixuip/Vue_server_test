<template>
  <div>
    <!-- header -->
    <van-nav-bar title="购物车" fixed :placeholder="true">
      <van-icon v-if="!showEdit" size="20px" name="edit" slot="right" @click="onEdit" />
      <van-icon v-else size="20px" name="cross" slot="right" @click="showEdit = !showEdit" />
    </van-nav-bar>

    <div class="container"></div>

    <!-- 内容 -->
    <van-swipe-cell>
      <van-card
        num="2"
        price="2999.00"
        desc="最新ipad！等你来抢,限时抢购"
        title="2020IPAD PRO"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #footer>
          <van-button size="mini">删除</van-button>
        </template>
      </van-card>
    </van-swipe-cell>
    <!-- 底部结算 -->
    <div>
      <van-submit-bar :price="599800" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onSubmit() {
      console.log("ok");
    },
    onBack() {
      this.$router.go(-1);
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