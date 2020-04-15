<template>
  <div>
    <h1>{{id? '编辑':'新建'}}商品</h1>
    <el-form @submit.native.prevent="saveGoods" label-width="120px">
      <el-form-item label="上级类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="model.price"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="model.body"></el-input>
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
      model: {
        icon: ""
      },
      categories: []
    };
  },

  methods: {
    afterUpload(res) {
      this.model.icon = res.url;
    },
    async saveGoods() {
      let res;
      if (this.id) {
        // 有ID进行更新操作
        res = await this.$http.put(`rest/goods/${this.id}`, this.model);
        this.$message({
          message: "商品信息更新成功",
          type: "success"
        });
      } else {
        // 没有ID进行添加操作
        res = await this.$http.post("rest/goods", this.model);
        this.$message({
          message: "商品添加成功",
          type: "success"
        });
      }
      this.$router.push("/goods/index");
    },
    async fetch() {
      const res = await this.$http.get(`rest/goods/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>