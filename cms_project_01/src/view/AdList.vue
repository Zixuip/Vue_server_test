<template>
  <div>
    <h1>轮播图列表</h1>
    <el-table :data="model">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/ads/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
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
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.model = res.data;
    },
    async remove(row) {
      // 删除row那行的数据
      this.$confirm(`是否确定要删除?"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 根据row._id。删除分类
        const res = await this.$http.delete(`rest/ads/${row._id}`);
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