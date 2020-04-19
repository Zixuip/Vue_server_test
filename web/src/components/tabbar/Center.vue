<template>
  <div>
    <!-- header -->
    <van-nav-bar title="个人中心" fixed :placeholder="true"></van-nav-bar>

    <!-- body -->
    <div class="container">
      <div class="floor floor_one" @click="login">
        <!--  <img :src="$store.state.user.avatar" v-if="$store.state.user.avatar" /> -->
        <img src="../../../public/img/github.png" />
        <p>请先登录</p>
        <!-- <p v-if="$store.state.user.user">{{ $store.state.user.user }}</p>
        <p v-else>{{ $t("m.login.noLogin") }}</p>-->
      </div>
      <van-cell class="member_item" title="个人信息" is-link @click="onInfo" />
      <van-cell class="member_item" title="我的订单" is-link @click="toOrder" />
      <van-cell class="member_item" title="我的地址" is-link @click="onAddress" />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onInfo() {
      this.$router.push("/Info");
    },
    toOrder() {},
    onAddress() {},
    login() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.avatar {
  padding: auto;
  margin: auto;
}
.page {
  background: rgb(245, 245, 245);
}
.floor_one {
  width: 100%;
  height: 200px;
  background: lightblue;
  text-align: center;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-top: 30px;
  }
  p {
    color: white;
    margin-top: 20px;
    font-size: 18px;
  }
}
.member_item {
  margin-bottom: 10px;
}
</style>