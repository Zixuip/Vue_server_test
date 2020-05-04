<template>
  <div>
    <!-- header -->
    <van-nav-bar title="全部" fixed :placeholder="true" />

    <!-- search -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      input-align="center"
      @search="onSearch"
      @cancel="onCancel"
    />

    <!-- body -->
    <div>
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
              <van-icon size="20px" name="cart-o" @click.stop="onAddCart(goodItem._id)" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="searchItem" class="rightItem">
        <div class="good-item flex">
          <div class="item d-flex" @click="$router.push(`/goodsinfo/${searchItem._id}`)">
            <img class="goods-img" :src="searchItem.icon" />
            <div>
              <p>{{ searchItem.name }}</p>
              <p class="product_price">
                <span>¥</span>
                {{ searchItem.price }}
              </p>
              <van-icon size="20px" name="cart-o" @click.stop="onAddCart(searchItem._id)" />
            </div>
          </div>
        </div>
      </div>
      <!-- 循环分类 -->
      <!-- <van-tabs @click="onBar" animated sticky>
        <van-tab
          :title="categoryItem.name"
          v-for="(categoryItem,categoryIndex) in items"
          :key="categoryIndex"
        >
        </van-tab>
      </van-tabs>-->
    </div>
  </div>
</template>


<script>
import { getStore } from "../../utils/storage";
import { Toast } from "vant";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      value: "",
      items: {},
      subitems: {},
      searchItem: []
    };
  },
  methods: {
    /* fetchCategoryList() {
      // 获取categories的相关数据
      this.$http.get("rest/categories").then(res => {
        this.items = res.data;
        this.fetchgoodslist();
      });
    }, */
    fetchgoodslist() {
      // 获取全部商品
      this.$http.get(`rest/goods`).then(res => {
        this.subitems = res.data;
        // console.log(this.subitems);
      });
    },
    /* onBar(index, title) {
      this.type = title;
      this.fetchgoodslist();
      console.log(this.type);
    }, */
    onSearch(val) {
      if (val) {
        this.$http.post("/search", { name: val }).then(res => {
          this.subitems = "";
          this.searchItem = res.data;
          console.log(this.searchItem);
        });
        Toast(val);
      } else {
        Toast("请输入详细的商品名字");
      }
    },
    onCancel() {
      this.subitems = "";
      this.searchItem = "";
      this.fetchgoodslist();
    },
    async onAddCart(id) {
      // 添加购物车
      await this.$http.post("/addcart", {
        userId: getStore("userId"),
        goodsId: id,
        goodsNum: 1
      });
      Toast("添加成功");
    }
  },
  computed: {},
  mounted() {
    this.fetchgoodslist();
    this.searchItem = "";
    // this.fetchCategoryList();
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