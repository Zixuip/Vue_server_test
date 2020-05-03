<template>
  <div>
    <van-nav-bar title="我的订单" left-arrow @click-left="onBack" />

    <div
      class="order_item"
      v-for="(item,i) in order"
      :key="i"
      @click="$router.push(`/order/${item._id}`)"
    >
      <div>
        <div class="order-top">
          <p class="order_num">
            订单号:{{item._id}}
            <!-- <van-button size="mini" @click="del(item._id)">删除</van-button> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
  data() {
    return {
      order: {}
    };
  },
  methods: {
    async fetchOrder() {
      const res = await this.$http.get("order");
      this.order = res.data;
    },
    onBack() {
      this.$router.push("/center");
    }
  },
  created() {
    this.fetchOrder();
  }
};
</script>

<style lang="scss">
.order_item {
  border-bottom: 1px solid #ccc;
  height: 100px;
  padding-top: 10px;
  background: white;
}
.order-top {
  font-size: 14px;
  line-height: 20px;
  padding: 0 10px;
}
</style>