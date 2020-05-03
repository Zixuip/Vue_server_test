<template>
  <div>
    <!-- header -->
    <van-nav-bar
      title="个人中心"
      fixed
      :placeholder="true"
      v-if="this.name !=''"
      right-text="退出登录"
      @click-right="out"
    ></van-nav-bar>
    <van-nav-bar title="个人中心" fixed :placeholder="true" v-else @click-right="out"></van-nav-bar>

    <!-- body -->
    <div class="container">
      <div class="floor floor_one" @click="login">
        <img src="../../../public/img/github.png" />
        <p v-if="this.name != ''">欢迎{{ name }}</p>
        <p v-else>请先登录</p>
      </div>
      <van-cell class="member_item" title="个人信息" is-link @click="onInfo" />
      <van-cell class="member_item" title="我的订单" is-link @click="toOrder" />
      <van-cell class="member_item" title="我的地址" is-link @click="onAddress" />

      <van-cell v-if="model" class="member_item" title="我的积分：" :value="model" />
      <van-cell v-else class="member_item" title="我的积分：" value="尚未获得积分" />
    </div>
  </div>
</template>


<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      active: 0,
      name: {},
      model: {}
    };
  },
  methods: {
    async fetchPoint() {
      const res = await this.$http.post("/point", { username: this.name });

      this.model = res.data;
    },
    // 个人信息
    onInfo() {
      if (this.name != "") {
        this.$router.push("/Info");
      } else {
        Notify({ type: "danger", message: "未登录" });
      }
    },
    // 我的订单
    toOrder() {
      if (this.name != "") {
        this.$router.push("/order");
      } else {
        Notify({ type: "danger", message: "未登录" });
      }
    },
    // 我的地址
    onAddress() {
      if (this.name != "") {
        this.$router.push("/address");
      } else {
        Notify();
        Notify({ type: "danger", message: "未登录" });
      }
    },

    login() {
      if (this.name != "") {
        return;
      } else {
        this.$router.push("/login");
      }
    },

    out() {
      localStorage.token = "";
      localStorage.name = "";
      localStorage.userId = "";
      this.$router.go(0);
    }
  },
  mounted() {
    // 获取Login传过来的username，并赋值给name
    this.name = localStorage.name;
    this.fetchPoint();
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