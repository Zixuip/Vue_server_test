<template>
  <div>
    <el-table :data="goods">
      <el-table-column prop="name" label="商品名称" width="140"></el-table-column>
      <el-table-column prop="body" label="商品内容" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      // 从http请求拿到goods，然后再赋值给data
      this.$http.get("goods").then(res => {
        this.goods = res.data;
      });
    },
    remove(id) {
      this.$http.delete(`goods/${id}`).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.fetch();
      });
    },
    edit(id) {
      this.$router.push(`/goods/${id}/edit`);
    }
  }
};
</script>

