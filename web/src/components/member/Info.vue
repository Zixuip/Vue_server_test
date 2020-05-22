<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onBack" />

    <van-cell-group>
      <van-cell title="用户名" :value="this.name" />
      <van-cell title="性别" value="男" />
    </van-cell-group>

    <!--  <div class="pageBottom van-button--danger" @click="onLogOut">
      <span class="tabbar-label">退出登录</span>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      name: {},
      option1: [
        { text: "男", value: 0 },
        { text: "女", value: 1 }
      ]
    };
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onLogOut() {
      this.$router.go(-1);
    }
  },
  created() {
    this.name = localStorage.name;
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
</style>