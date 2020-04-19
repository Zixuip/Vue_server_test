<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onBack" />

    <van-cell-group>
      <van-cell title="用户名" :value="items.username" />
      <van-cell title="性别" value="男" />
    </van-cell-group>

    <div class="pageBottom van-button--danger" @click="onLogOut">
      <span class="tabbar-label">退出登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    fetch() {
      this.$http.get("rest/admin_user").then(res => {
        this.items = res.data;
        console.log(this.items);
      });
    },
    onBack() {
      this.$router.go(-1);
    },
    onLogOut() {
      localStorage.token = "";
      this.$router.go(-1);
    }
  },
  created() {
    this.fetch();
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