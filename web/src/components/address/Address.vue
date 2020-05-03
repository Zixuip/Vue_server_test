<template>
  <div class="page">
    <van-nav-bar title="我的地址" left-arrow @click-left="onBack" />

    <van-address-list :list="addressData" @edit="onEditAddress" @add="onAddAddress" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressData: []
    };
  },
  methods: {
    fetchAddress() {
      this.$http.get("rest/address").then(res => {
        this.addressData = res.data;
      });
    },
    onBack() {
      this.$router.go(-1);
    },
    onAddAddress() {
      this.$router.push("/addaddress");
    },
    onEditAddress(item) {
      // item获取当前行的信息
      this.$router.push({
        path: `./editaddress/${item._id}`
      });
    }
  },
  created() {
    this.fetchAddress();
  }
};
</script>

