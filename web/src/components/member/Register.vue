<template>
  <div class="page">
    <van-nav-bar left-arrow @click-left="onBack" title="注册" />

    <div class="login">
      <van-cell-group @submit.native.prevent="register">
        <van-field
          v-model="model.username"
          required
          clearable
          left-icon="contact"
          placeholder="请输入用户名"
          label="用户名："
        />
        <van-field
          v-model="model.password"
          left-icon="closed-eye"
          type="password"
          placeholder="请输入密码"
          required
          label="密码："
        />
        <van-field
          v-model="model._password"
          left-icon="closed-eye"
          type="password"
          placeholder="请输入密码"
          label="确认密码："
        />
      </van-cell-group>
      <van-button class="login_btn" size="small" round type="info" @click="onRegister">注册</van-button>
    </div>
    <div class="register" @click="toLogin">已经有账号了？去登录</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    onBack() {
      this.$router.go(-1);
    },
    async onRegister() {
      if (!this.model.username) {
        Toast("请输入用户名");
      } else if (!this.model.password) {
        Toast("请输入密码");
      } else if (this.model.password != this.model._password) {
        Toast("两次密码不相同");
      } else {
        const res = await this.$http.post("rest/user", this.model);
        this.model = res.data;
        Toast("注册成功");
        this.$router.push("/login");
      }
    }
  }
};
</script>