<template>
  <div class="page">
    <van-nav-bar title="登录" />

    <div class="login">
      <van-cell-group @submit.native.prevent="login">
        <van-field v-model="model.username" required clearable left-icon="contact" label="用户名：" />

        <van-field
          v-model="model.password"
          left-icon="closed-eye"
          type="password"
          required
          label="密码："
        />
      </van-cell-group>
      <van-button class="login_btn" size="small" round type="info" @click="login">登录</van-button>
    </div>
    <div class="register" @click="toRegister">还没账号？注册一个呗</div>
  </div>
</template>

<script>
import { setStore } from "../../utils/storage";
import { Toast } from "vant";
export default {
  data() {
    return {
      model: {},
      username: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      console.log(res.data.message);
      let { username, token, userId } = res.data;
      setStore("token", token);
      setStore("name", username);
      setStore("userId", userId);
      // localStorage.token = res.data.token;
      // localStorage.username = res.data.username;
      this.$router.push("/center");
      Toast("登录成功");
      console.log(res.data);
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