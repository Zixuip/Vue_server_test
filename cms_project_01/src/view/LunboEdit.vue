<template>
  <div>
    <h1>{{id? '编辑':'新建'}}轮播图</h1>
    <el-form @submit.native.prevent="saveGoods" label-width="120px">
      <el-form-item label="轮播图名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="轮播图">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转地址">
        <el-input type="text" v-model="model.urlink"></el-input>
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
      }
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
        res = await this.$http.put(`rest/lunbo/${this.id}`, this.model);
        this.$message({
          message: "商品信息更新成功",
          type: "success"
        });
      } else {
        // 没有ID进行添加操作
        res = await this.$http.post("rest/lunbo", this.model);
        this.$message({
          message: "商品添加成功",
          type: "success"
        });
      }
      this.$router.push("/lunbo/index");
    },
    async fetch() {
      const res = await this.$http.get(`rest/lunbo/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
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
  width: 300px;
  height: 150px;
  display: block;
}
.img {
  width: 100%;
}
</style>