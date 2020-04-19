<template>
  <div>
    <!-- header -->
    <van-nav-bar title="分类" fixed :placeholder="true" />

    <!-- search -->
    <van-search placeholder="请输入搜索关键词" input-align="center" class="search" />

    <!-- body -->
    <div>
      <!-- 循环分类 -->
      <van-tabs @click="onBar" animated sticky>
        <van-tab
          :title="categoryItem.name"
          v-for="(categoryItem,categoryIndex) in items"
          :key="categoryIndex"
        >
          <!-- 循环商品 -->
          <div v-for="(goodItem,goodIndex) in subitems" :key="goodIndex" class="rightItem">
            <div class="good-item flex">
              <div class="item d-flex" @click="$router.push(`/goodsinfo/${goodItem._id}`)">
                <img class="goods-img" :src="goodItem.icon" />
                <div>
                  <p>{{ goodItem.name }}</p>
                  <p class="product_price">
                    <span>¥</span>
                    {{ goodItem.price }}
                  </p>
                  <van-icon size="20px" name="cart-o" @click.stop="onAddCart(categoryItem)" />
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      items: [],
      subitems: [],
      type: ""
    };
  },
  methods: {
    fetchCategoryList() {
      // 获取categories的相关数据
      this.$http.get("rest/categories").then(res => {
        this.items = res.data;
        this.type = this.items[0]._id;
        console.log(this.type);
        this.fetchgoodslist();
      });
    },
    fetchgoodslist() {
      this.$http.get(`rest/goods`, this.type).then(res => {
        this.subitems = res.data;
      });
    },
    onBar(index, title) {
      this.type = title;
      this.fetchgoodslist();
      console.log(this.type);
    }
  },
  mounted() {
    this.fetchCategoryList();
  }
};
</script>

<style lang="scss">
.goods-img {
  margin-right: 10px;
  width: 120px;
  height: 100px;
}

.product_price {
  margin: 10px 0;
  color: red;
}
.good-item {
  border-bottom: 1px solid #ccc;
  height: 110px;
  width: 100%;
  background: white;
}
.rightItem {
  box-sizing: border-box;
}
.van-tabs--line {
  width: 100%;
}
</style>