<template>
  <div>
    <!-- header -->
    <van-nav-bar title="商品详情" left-arrow @click-left="onBack" fixed />

    <div class="container">
      <div>
        <img :src="goods.icon" class="goodsImg" />
        <div class="detail-content">
          <div class="d-flex fs-xxl">
            <p class="price fs-xxl">商品价格:{{ goods.price }}￥</p>
          </div>
          <p class="amount fs-md">剩余:{{ goods.amount }}件</p>
          <van-divider />
          <div v-for="(items,index) in goods.img" :key="index">
            <img :src="items.image" class="imgage" />
          </div>
        </div>
      </div>
    </div>

    <!-- tabbar -->
    <van-goods-action class="tabbar">
      <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onBuyClicked(goods._id)" />
    </van-goods-action>
  </div>
</template>

<script>
import { getStore } from "../../utils/storage";
import { Toast } from "vant";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      goods: {}
    };
  },
  methods: {
    // 获取商品
    async fetchgoodslist() {
      const res = await this.$http.get(`rest/goods/${this.id}`);
      this.goods = res.data;
    },
    toCart() {
      this.$router.push("../Shopcart");
    },
    onBack() {
      // Toast("成功");
      this.$router.go(-1);
    },
    async onBuyClicked(id) {
      await this.$http.post("/addcart", {
        userId: getStore("userId"),
        goodsId: id,
        /* goodsname: name,
        goodsprice: price,
        goodspoint: point,
        goodsimg: icon, */
        goodsNum: 1
      });
      Toast("添加成功");
    }
  },
  created() {
    this.fetchgoodslist();
  }
};
</script>
<style lang="scss">
.tabbar {
  margin-bottom: 50px;
}
.goodsImg {
  margin-top: 50px;
  width: 100%;
  height: 300px;
}
.price {
  color: red;
}
.amount {
  color: black;
}
.imgage {
  width: 100%;
}
</style>
