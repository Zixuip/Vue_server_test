<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onBack" />

    <div class="fs-xl">
      <div>
        <div class="address_show" @click="onAddressChoose">
          <div v-if="!addressInfo.name">
            <van-cell title="选择地址" is-link />
          </div>
          <div v-else>
            <div class="jc-between">
              <div>收件人：{{ addressInfo.name }}</div>
              <div>电话：{{ addressInfo.tel }}</div>
            </div>
            <div>地址：{{ addressInfo.address }}</div>
          </div>
        </div>

        <van-popup v-model="showList" position="bottom">
          <van-contact-list
            v-model="chosenContactId"
            :list="addressData"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </van-popup>
        <van-card
          v-for="(orderItem, orderIndex) in orderData"
          :key="orderIndex"
          :num="orderItem.goodsNum"
          :price="orderItem.goodsPrice"
          :title="orderItem.goodsName"
          :thumb="orderItem.goodsImg"
        />
        <van-submit-bar
          class="btn"
          :price="orderData[0].goodsNum * orderData[0].goodsPrice * 100"
          button-text="结算"
          @submit="onOrder(orderData, addressInfo)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from "../../utils/storage";
import { Toast } from "vant";
export default {
  data() {
    return {
      chosenContactId: null,
      showList: false,
      showEdit: false,
      isEdit: false,
      addressData: [],
      orderData: [],
      addressInfo: {}
    };
  },
  methods: {
    async fetchCart() {
      // 获取购物车
      const res = await this.$http.get("cart");
      this.orderData = res.data;
      // console.log(this.orderData);
    },
    async fetchAddress() {
      // 获取地址
      const res = await this.$http.get("rest/address");
      this.addressData = res.data;
    },
    async onOrder(orderData, addressInfo) {
      // 下单
      if (!addressInfo.name) {
        Toast("请选择地址");
      } else {
        addressInfo = this.addressInfo;
        this.$http.post("/order", {
          userId: getStore("userId"),
          id: orderData[0].goodsId,
          price: orderData[0].goodsNum * orderData[0].goodsPrice * 100,
          num: orderData[0].goodsNum,
          point: orderData[0].goodsPoint,
          name: addressInfo.name,
          tel: addressInfo.tel,
          post: addressInfo.post,
          address: addressInfo.address
        });

        Toast("下单成功");

        this.$router.push("/order");
      }
    },
    onAdd() {
      this.$router.push("/addaddress");
    },
    onEdit(item) {
      this.$router.push({
        path: `./editaddress/${item._id}`
      });
    },
    onSelect(item) {
      console.log("item", item);
      this.showList = false;
      this.addressInfo = item;
    },
    onAddressChoose() {
      this.showList = true;
    },
    onBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fetchAddress();
    this.fetchCart();
  }
};
</script>
<style lang="scss">
.address_show {
  background: white;
  padding: 10px;
}
.btn {
  position: fixed;
  margin-bottom: 0;
}
</style>