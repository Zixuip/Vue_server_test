<template>
  <div>
    <h1>轮播图列表</h1>
    <el-table :data="model">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="icon" label="图片"></el-table-column>
      <el-table-column prop="urlink" label="跳转地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/lunbo/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    /* async fetch() {
      const res = await this.$http.get("lunbo");
      this.model = res.data;
    } */
    fetch() {
      // 获取lunbo的相关数据
      this.$http.get("rest/lunbo").then(res => {
        this.model = res.data;
        this.model.icon = res.url;
      });
    },
    async remove(row) {
      // 删除row那行的数据
      this.$confirm(`是否确定要删除?"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 根据row._id。删除分类
        const res = await this.$http.delete(`rest/lunbo/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  }
};
</script>