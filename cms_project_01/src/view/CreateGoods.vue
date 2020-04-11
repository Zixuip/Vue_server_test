<template>
  <el-form @submit.native.prevent="saveGoods" ref="form" :model="good" label-width="80px">
    <el-form-item label="商品名称">
      <el-input v-model="good.name"></el-input>
    </el-form-item>
    <el-form-item label="商品描述">
      <el-input type="textarea" v-model="good.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      good: {}
    };
  },
  methods: {
    saveGoods() {
      this.$http.post("goods", this.good).then(res => {
        this.$message({
          message: "商品添加成功",
          type: "success"
        });
        this.$router.push("/goods/index");
      });
    }
  }
};
</script>