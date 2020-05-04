<template>
  <div>
    <!-- header -->
    <van-nav-bar title="购物车" fixed :placeholder="true"></van-nav-bar>

    <!-- 内容 -->
    <!-- <div v-if="model">
      <van-swipe-cell v-for="(goods,i) in model" :key="i">
        <van-card
          class="goods-card"
          :num="goods.goodsNum"
          :price="goods.goodsPrice"
          :title="goods.goodsName"
          :thumb="goods.goodsImg"
        >
          <template #footer>
            <van-button size="mini" @click="del(goods._id)">删除</van-button>
          </template>
        </van-card>
      </van-swipe-cell>
    </div>-->
    <div v-if="model">
      <van-swipe-cell>
        <van-card
          class="goods-card"
          :num="model[0].goodsNum"
          :price="model[0].goodsPrice"
          :title="model[0].goodsName"
          :thumb="model[0].goodsImg"
        >
          <template #footer>
            <van-button size="mini" @click="del(model[0]._id)">删除</van-button>
          </template>
        </van-card>
      </van-swipe-cell>
    </div>

    <!-- 底部结算 -->
    <div>
      <van-submit-bar
        :price="model[0].goodsPrice * model[0].goodsNum * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>


<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      active: 0,
      model: {},
      goodsNum: {}
    };
  },
  methods: {
    async fetchCart() {
      const res = await this.$http.get("cart");
      this.model = res.data;
      // console.log(this.model[0]._id);
    },
    onSubmit() {
      this.$router.push("orderwait");
    },
    onBack() {
      this.$router.go(-1);
    },
    showEdit() {},
    async del(id) {
      await this.$http.post("delcart", { _id: id });
      Toast("删除成功");
      this.$router.go(0);
    }
  },
  created() {
    this.fetchCart();
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