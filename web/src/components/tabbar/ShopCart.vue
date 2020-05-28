<template>
  <div>
    <!-- header -->
    <van-nav-bar title="购物车" fixed :placeholder="true"></van-nav-bar>

    <!-- 内容 -->
    <div v-if="model">
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
      tableData: [],
      items: [],
      goodsNum: 0
    };
  },
  methods: {
    async fetchCart() {
      const res = await this.$http.get("cart");
      this.tableData = res.data;
      this.model = this.tableData;
      console.log(this.model);
    },
    onSubmit() {
      this.$router.push("orderwait");
    },
    onBack() {
      this.$router.go(-1);
    },
    showEdit() {},
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