<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1','2','3']" default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>商品管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/index">商品分类</el-menu-item>
            <el-menu-item index="/categories/create">新增分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">商品</template>
            <el-menu-item index="/goods/index">商品列表</el-menu-item>
            <el-menu-item index="/goods/create">新增商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-tickets"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/index">广告列表</el-menu-item>
            <el-menu-item index="/ads/create">新增广告</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-tickets"></i>系统管理
          </template>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_user/index">管理员列表</el-menu-item>
            <el-menu-item index="/admin_user/create">新增管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
        <el-button round @click="$router.push('/login')">退出登录</el-button>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    out() {
      // localStorage.token.clear();
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {};
  }
};
</script>