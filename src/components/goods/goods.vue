<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-Wrapper>
      <ul>
        <li
          v-for="item in goods"
          :key="item.name"
          class="item-list"
          :class="{'current':currentIndex === $index}"
          @click="currentMenu($index,$event)"
        >
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-Wrapper>
      <ul>
        <li v-for="item in goods" :key="item.name" class="item-list item-list-hook">
          <h1 class="title border-1px">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food.name" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt width="57" />
              </div>
              <div class="content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="matters">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">
                    <span>￥</span>
                    {{food.price}}
                  </span>
                  <span class="oldPrice" v-show="food.oldPrice">
                    <span>￥</span>
                    {{food.oldPrice}}
                  </span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectFoods"
      v-ref:shopcart
    ></shopCart>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import shopcart from "components/shopCart/shopCart";
import cartcontrol from "components/cartControl/cartControl";

const ERR_OK = 0; // 状态码

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  data() {
    return {
      goods: [],
      itemHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex() {
      // 这里返回某部分的索引值，已被menu高亮使用
      for (let i = 0; i < this.itemHeight.length; i++) {
        let heightTop = this.itemHeight[i];
        let heightBottom = this.itemHeight[i + 1];
        if (
          !heightBottom ||
          (this.scrollY >= heightTop && this.scrollY < heightBottom)
        ) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            // 组件cartControl 中 点击加减时在数据中添加了 count字段
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    // 调用一些请求
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("/api/goods").then(Response => {
      Response = Response.body;
      if (Response.errno === ERR_OK) {
        this.goods = Response.data;
        this.$nextTick(() => {
          // 延迟调用
          this.initScroll(); // 初始化插件
          this.computedHeight(); // 页面渲染后计算高度
        });
      }
    });
  },
  methods: {
    // 常用函数
    currentMenu(index, event) {
      // 点击menu事件
      // scrollToElement(el, time, offsetX, offsetY, easing)
      if (!event._constructed) {
        // 为了防止pc端点击触发两次的情况
        return false;
      }
      let foodList = this.$els.foodsWrapper.getElementsByClassName(
        "item-list-hook"
      );
      let item = foodList[index];
      this.foodsScroll.scrollToElement(item, 1000);
      // return index;
    },
    initScroll() {
      //  初始化滚动事件
      // scroll 内置去除了点击事件，要加对应属性
      this.menuScroll = new BScroll(this.$els.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
        probeType: 3,
        click: true
      });
      // 实时获取滚动的scrollY值;
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    computedHeight() {
      // 计算li高度存入数组
      let foodList = this.$els.foodsWrapper.getElementsByClassName(
        "item-list-hook"
      );
      let height = 0;
      this.itemHeight.push(height);
      // 存右侧每个li的高度值
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.itemHeight.push(height);
      }
    },
    _drop(el) {
      // three   优化动画执行顺序
      this.$nextTick(() => {
        this.$refs.shopcart.drop(el);
      });
    }
  },
  events: {
    // two
    "cart.add"(target) {
      this._drop(target);
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';

.goods {
  display: flex;
  position: absolute;
  top: 175px;
  bottom: 46px;
  width: 100%;
  z-index: 2;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 56px;
    background-color: #f3f5f7;

    .item-list {
      display: flex;
      align-items: center;
      height: 54px;
      margin: 0 12px;
      border-1px(rgba(7, 17, 27, 0.1));

      &.current {
        position: relative;
        z-index: 10;
        margin: 0;
        padding: 0 12px;
        margin-top: -1px;
        font-weight: 700;
        background: #fff;
        border-none();
      }

      &:last-child {
        border-none();
      }

      .text {
        font-size: 12px;
        line-height: 14px;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 1px;
          vertical-align: top;

          &.decrease {
            bg-image('./img/decrease_3');
          }

          &.discount {
            bg-image('./img/discount_3');
          }

          &.guarantee {
            bg-image('./img/guarantee_3');
          }

          &.invoice {
            bg-image('./img/invoice_3');
          }

          &.special {
            bg-image('./img/special_3');
          }

          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    width: 100%;

    .item-list {
      line-height: 26px;
      font-size: 12px;

      .title {
        color: rgb(147, 153, 159);
        height: 26px;
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
      }

      .food-item {
        position: relative;
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-1px(rgba(7, 17, 27, 0.1));

        &:last-child {
          border-none();
          margin-bottom: 0;
        }

        .icon {
          font-size: 0;
          flex: 0 0 57px;
          margin-right: 10px;
          vertical-align: top;
        }

        .content {
          .food-name {
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            margin-top: 2px;
          }

          .desc {
            margin: 8px 0;
          }

          .desc, .matters {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }

          .matters {
            .rating {
              margin-left: 12px;
            }
          }

          .price {
            margin-top: 8px;

            .nowPrice {
              font-size: 14px;
              color: rgb(240, 20, 20);
              font-weight: 700;
              line-height: 24px;

              &>span {
                font-size: 10px;
                font-weight: normal;
              }
            }

            .oldPrice {
              margin-left: 8px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              font-weight: 700;
              line-height: 24px;
              text-decoration: line-through;

              &>span {
                font-size: 10px;
                font-weight: normal;
              }
            }
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          bottom: 0;
          right: 12px;
        }
      }
    }
  }
}
</style>