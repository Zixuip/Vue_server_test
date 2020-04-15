<template>
  <div class="about">
    <h1>{{id? '编辑':'新建'}}管理员</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 判断是否有id，有则根据ID进行修改相应信息
        res = await this.$http.put(`rest/admin_user/${this.id}`, this.model);
      } else {
        // 无ID，则进行添加操作
        res = await this.$http.post("rest/admin_user", this.model);
      }
      // 添加完后，跳转到上一页
      this.$router.push("/admin_user/index");
      this.$message({
        message: "分类添加成功",
        type: "success"
      });
    },

    async fetch() {
      const res = await this.$http.get(`rest/admin_user/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>