<template>
  <div class="sudoku_row">
    <div
      class="sudoku_item"
      :class="curSelect==sudoku.id?'opacity':''"
      v-for="(sudoku,index) in sudokus"
      :key="index"
      @touchstart="touchstart(index)"
      @touchend="touchend"
    >
      <img :src="sudoku.img_src" width="40" height="40" />
      {{sudoku.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "sudoku",
  data() {
    return {
      sudokus: [
        { id: 0, name: "冷饮", img_src: require("../assets/home/1.jpg") },
        { id: 1, name: "鱼类", img_src: require("../assets/home/2.jpg") },
        { id: 2, name: "寻宝", img_src: require("../assets/home/3.jpg") },
        { id: 3, name: "国货", img_src: require("../assets/home/4.jpg") },
        { id: 4, name: "冰鲜", img_src: require("../assets/home/5.jpg") },
        { id: 5, name: "水果", img_src: require("../assets/home/6.jpg") },
        { id: 6, name: "肉类", img_src: require("../assets/home/7.jpg") },
        { id: 7, name: "肉类", img_src: require("../assets/home/8.jpg") }
      ]
    };
  },
  methods: {
    touchstart: function(e) {
      var that = this;
      var list = that.sudokus;
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].id === e) {
          that.curSelect = i;
        }
      }
    },
    touchend: function() {
      var that = this;
      that.curSelect = null;
    }
  }
};
</script>


<style lang="scss">
.sudoku_row {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}
.sudoku_item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.opacity {
  opacity: 0.4;
  background: #e5e5e5;
}
.sudoku_item img {
  margin-bottom: 3px;
  display: block;
}
</style>

