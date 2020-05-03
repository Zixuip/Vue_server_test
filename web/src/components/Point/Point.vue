<template>
  <div>
    <van-nav-bar title="我的积分" left-arrow @click-left="onBack" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>