<template>
  <div>
    <h3>商品列表</h3>
    <el-table :data="goods">
      <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="price" label="新价格" width="150"></el-table-column>
      <el-table-column prop="oldprice" label="旧价格" width="150"></el-table-column>
      <el-table-column prop="amount" label="库存" width="150"></el-table-column>
      <el-table-column prop="icon" label="商品图片" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="body" label="商品简介"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/goods/edit/${scope.row._id}`)"
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
      goods: [
        {
          categories: []
        }
      ]
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/goods");
      this.goods = res.data;
    },
    /* fetch() {
      // 从http请求拿到goods，然后再赋值给data
      this.$http.get("goods").then(res => {
        this.goods = res.data;
      });
    }, */
    async remove(row) {
      // 删除row那行的数据
      this.$confirm(`是否确定要删除?"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        // 根据row._id。删除分类
        const res = await this.$http.delete(`rest/goods/${row._id}`);
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

