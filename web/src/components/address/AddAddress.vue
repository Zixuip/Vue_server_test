<template>
  <div>
    <van-nav-bar title="添加地址" left-arrow @click-left="onBack" />

    <van-cell-group @submit.native.prevent="onSave">
      <van-field v-model="addressInfo.name" required label="姓名" placeholder="请输入姓名" />
      <van-field v-model="addressInfo.tel" required clearable label="电话号码" placeholder="请输入号码" />
      <van-field v-model="addressInfo.post" required clearable label="邮编" placeholder="510000" />
      <van-field v-model="addressInfo.address" required clearable label="地址" placeholder="广州白云区" />
    </van-cell-group>

    <!-- bottom -->
    <div class="pageBottom van-button--danger" @click="onSave">
      <span class="tabbar-label">添加</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "../../utils/area";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {}
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    async onSave() {
      if (!this.addressInfo.tel) {
        Toast("请输入电话号码");
      } else {
        if (
          !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
            this.addressInfo.tel
          )
        ) {
          Toast("请输入正确的电话号码");
        } else {
          const res = await this.$http.post("rest/address", this.addressInfo);
          this.addressInfo = res.data;
          this.$router.push("/address");
        }
      }
    }
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