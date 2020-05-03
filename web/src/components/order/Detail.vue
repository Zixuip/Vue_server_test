<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onBack" />

    <div>
      <van-cell-group>
        <van-cell title="订单号：" :value="item._id" />
        <van-cell title="收件人：" :value="item.addressName" />
        <van-cell title="电话：" :value="item.addressTel" />
        <van-cell title="邮编：" :value="item.addressPost" />
        <van-cell title="地址：" :value="item.address" />
        <van-cell title="商品总价(元)：" :value="item.goodsPrice/100" />
        <van-cell title="商品数量：" :value="item.goodsNum" />
        <van-cell title="获得积分：" :value="item.goodsPoint * item.goodsNum" />
        <van-cell title="点击跳转，查看商品详情" @click="$router.push(`/goodsinfo/${item.goodsId}`)" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      item: {},
      goods: {}
    };
  },
  methods: {
    async fetchDetail() {
      const res = await this.$http.get(`order/${this.id}`);
      this.item = res.data;
      this.goodsId = res.data.goodsId;
    },

    onBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fetchDetail();
  }
};
</script>
<style lang="scss">
.van-cell__value {
  overflow: visible !important;
}
</style>