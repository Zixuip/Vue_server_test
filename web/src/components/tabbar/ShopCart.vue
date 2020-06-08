<template>
  <div>
    <!-- header -->
    <van-nav-bar title="购物车" fixed :placeholder="true"></van-nav-bar>

    <!-- 内容 -->
    <div v-if="model">
      <van-swipe-cell v-for="(goods,i) in model" :key="i">
        <van-card
          class="goods-card"
          :price="goods.goodsPrice"
          :title="goods.goodsName"
          :thumb="goods.goodsImg"
        >
          <template #footer>
            <van-stepper v-model="goods.goodsNum" @plus="add(goods.goodsId)" />
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="del(goods.goodsId)"
          />
        </template>
      </van-swipe-cell>
    </div>

    <div>
      <van-submit-bar :price="totalPrice *100" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>


<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      active: 0,
      model: [],
      items: [],
      goodsNum: 0
    };
  },
  methods: {
    async fetchCart() {
      const res = await this.$http.get("cart");
      this.model = res.data;
    },
    onSubmit() {
      this.$router.push("orderwait");
    },
    onBack() {
      this.$router.go(-1);
    },
    async add(id) {
      await this.$http.post("/addcart", {
        goodsId: id,
        goodsNum: 1
      });
    },
    async del(id) {
      await this.$http.post("delcart", { goodsId: id });
      Toast("删除成功");
      this.$router.go(0);
    }
  },
  created() {
    this.fetchCart();
  },
  computed: {
    totalCount() {
      //reduce方法计算
      return this.model.reduce((pre, items) => {
        return pre + items.goodsNum;
      }, 0);
    },
    totalPrice() {
      return this.model.reduce((pre, items) => {
        return pre + items.goodsPrice * items.goodsNum;
      }, 0);
    }
  }
};
</script>
<style >
.van-submit-bar {
  margin-bottom: 55px;
}
.delete-button {
  height: 100% !important;
}
</style>