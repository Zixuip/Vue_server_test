<template>
  <div class="page">
    <van-nav-bar left-arrow @click-left="onBack" title="登录" />

    <div class="login">
      <van-cell-group @submit.native.prevent="login">
        <van-field v-model="model.username" required clearable left-icon="contact" label="用户名：" />

        <van-field v-model="model.password" left-icon="edit" type="password" required label="密码：" />
      </van-cell-group>
      <van-button class="login_btn" size="small" round type="info" @click="login">登录</van-button>
    </div>
    <div class="register" @click="toRegister">还没账号？注册一个呗</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    /* login() {
      console.log(this.model);
    }, */
    async login() {
      const res = await this.$http.post("login");
      localStorage.token = res.data.token;
      //把服务端返回的token保存到浏览器的存储中，浏览器关闭后，数据还在
      // sessionStorage.token = res.data.token;
      // sessionStorage：浏览器关闭后，数据自动清空
      this.$router.push("/center");
      console.log(res.data);
    },
    onBack() {
      // 返回
      this.$router.push("/center");
    },
    toRegister() {
      // 注册
      this.$router.push("/register");
    }
  }
};
</script>


<style >
.page {
  background: #f2f3f5;
}
.login {
  text-align: center;
  margin-top: 94px;
  margin-left: 10px;
  margin-right: 10px;
}
.login_btn {
  margin: 20px;
  width: 100px;
}
.register {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  color: #ccc;
  font-size: 12px;
  text-align: center;
}
</style>