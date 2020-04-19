<template>
  <div>
    <!-- swiper -->
    <van-swipe :autoplay="3000">
      <van-swipe-item class="swipe" v-for="(items,index) in model" :key="index">
        <img class="swipe_img" :src="items.img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 九宫格之八 -->
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
    <van-divider />
    <!-- 下方商品 -->
    <div>
      <div class="goods-list">
        <div
          class="goods-item"
          @click="$router.push(`/goodsinfo/${items._id}`)"
          v-for="(items,index) in goods"
          :key="index"
        >
          <img :src="items.icon" />
          <h1 class="title">{{items.name}}</h1>
          <div class="info">
            <p class="price">
              <span class="now">{{items.price}}￥</span>
              <span class="old">{{items.oldprice}}￥</span>
            </p>
            <p class="sell">
              <span>{{items.body}}</span>
            </p>
          </div>
        </div>
      </div>
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
        { id: 2, name: "积分", img_src: require("../assets/home/3.jpg") },
        { id: 3, name: "国货", img_src: require("../assets/home/4.jpg") },
        { id: 4, name: "冰鲜", img_src: require("../assets/home/5.jpg") },
        { id: 5, name: "水果", img_src: require("../assets/home/6.jpg") },
        { id: 6, name: "肉类", img_src: require("../assets/home/7.jpg") },
        { id: 7, name: "肉类", img_src: require("../assets/home/8.jpg") }
      ],
      model: [],
      goods: []
    };
  },
  methods: {
    // 获取商品
    async fetchgoodslist() {
      const res = await this.$http.get("rest/goods");
      this.goods = res.data;
    },
    // 获取轮播图
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.model = res.data;
    },
    curSelect() {},
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
  },
  created() {
    this.fetch();
    this.fetchgoodslist();
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

// swpier
.swiper {
  margin-top: 50px;
}
.swipe_img {
  width: 100%;
  height: 160px;
  margin-top: 46px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  width: 100%;
}

// goods
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    box-shadow: 0 0 4px #ccc;
    margin: 4px 0;
    padding: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-size: 16px;
          font-weight: bold;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 5px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>

