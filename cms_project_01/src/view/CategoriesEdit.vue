<template>
  <div class="about">
    <h1>{{id? '编辑':'新建'}}分类</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 判断是否有id，有则根据ID进行修改相应信息
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        // 无ID，则进行添加操作
        res = await this.$http.post("rest/categories", this.model);
      }
      // 添加完后，跳转到上一页
      this.$router.push("/categories/index");
      this.$message({
        message: "分类添加成功",
        type: "success"
      });
    },
    /* save() {
      this.$http.post("categories", this.model).then(res => {
        this.$message({
          message: "分类添加成功",
          type: "success"
        });
        this.$router.push("/categories/index");
      });
    } */
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchparents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchparents();
    this.id && this.fetch();
  }
};
</script>