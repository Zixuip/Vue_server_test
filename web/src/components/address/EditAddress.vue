<template>
  <div>
    <van-nav-bar title="修改地址" left-arrow @click-left="onBack">
      <van-icon size="20px" color="#f44" name="delete" slot="right" @click="onDelete" />
    </van-nav-bar>

    <van-cell-group>
      <van-field v-model="addressInfo.name" required label="姓名" placeholder="请输入姓名" />
      <van-field v-model="addressInfo.tel" required clearable label="电话号码" placeholder="请输入号码" />
      <van-field v-model="addressInfo.post" required clearable label="邮编" placeholder="510000" />
      <van-field v-model="addressInfo.address" required clearable label="地址" placeholder="广州白云区" />
    </van-cell-group>

    <!-- bottom -->
    <div class="pageBottom van-button--danger" @click="onSave">
      <span class="tabbar-label">修改</span>
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
      addressInfo: {}
    };
  },
  methods: {
    fetchaddressInfo() {
      this.$http.get(`rest/address/${this.id}`).then(res => {
        this.addressInfo = res.data;
      });
    },
    onBack() {
      this.$router.go(-1);
    },
    onSave() {
      this.$http.put(`rest/address/${this.id}`, this.addressInfo);
      this.$router.push("/address");
    },
    onDelete() {
      this.$http.delete(`rest/address/${this.id}`, this.addressInfo);
      this.$router.push("/address");
    }
  },
  created() {
    this.fetchaddressInfo();
  }
};
</script>

<style lang="scss">
.pageBottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 40px;
  color: white;
  font-size: 14px;
  text-align: center;
}
.area {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
</style>