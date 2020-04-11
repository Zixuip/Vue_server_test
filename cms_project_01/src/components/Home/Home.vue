<template>
  <div>
    我是首页
    <!-- 轮播图 -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$axios.get("").then(res => {});
  }
};
</script>

<style lang="">
</style>