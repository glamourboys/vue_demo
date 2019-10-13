
<template>
  <div>
    <div class="shopCart">
      <div class="content" :class="{'hightBgColor' : totalPrice > 0}" @click="toggleShow($event)">
        <div class="shop-left">
          <div class="logo-wrapper inline">
            <div class="logo" :class="{'hightBgColor' : totalPrice > 0}">
              <span class="count" v-show="totalCount > 0">{{totalCount}}</span>
              <span class="icon-shopping_cart"></span>
            </div>
          </div>
          <div class="price inline" :class="{'hightBgColor' : totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="require inline">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="shop-right" :class="changePay" @click.stop.prevent="payNow">
          <div class="payPrice">{{DiffPrice}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div
          v-for="ball in balls"
          :key="ball.show"
          v-show="ball.show"
          class="ball"
          transition="drop"
        >
          <div class="inner inner-hook"></div>
        </div>
      </div>
      <div class="shop-list" v-show="foodList" transition="fade">
        <div class="list-header border-1px">
          <h1 class="title">购物车</h1>
          <div class="clear" @click="clearFood">清空</div>
        </div>
        <div class="list-content" v-el:cart-list>
          <ul>
            <li
              v-for="food in selectFoods"
              :key="food.price"
              class="foodList border-1px"
              transition="foodFade"
            >
              <span class="name">{{food.name}}</span>
              <div class="list-right">
                <div class="price">
                  ￥
                  <span class="text">{{food.price}}</span>
                </div>
                <div class="cartControl">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mask" v-show="foodList" transition="fade"></div>
  </div>
</template>

<script>
/* eslint-disable */
import BScroll from "better-scroll";
import cartcontrol from "components/cartControl/cartControl";

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{ price: 10, count: 1 }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    cartcontrol
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      fold: true
    };
  },
  computed: {
    totalPrice() {
      // 计算总价
      let total = 0;
      if (this.selectFoods instanceof Array) {
        this.selectFoods.forEach(food => {
          total += food.price * food.count;
        });
      }
      return total;
    },
    totalCount() {
      // 计算总数
      let total = 0;
      if (this.selectFoods instanceof Array) {
        this.selectFoods.forEach(food => {
          total += food.count;
        });
      }
      return total;
    },
    DiffPrice() {
      // 起送价变化
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return `去结算`;
      }
    },
    changePay() {
      // 达到起送价时结算按钮高亮
      // 大于最低价时的状态
      if (this.totalPrice >= this.minPrice) {
        return `hightBgColor`;
      } else {
        return "";
      }
    },
    foodList() {
      if (!this.totalPrice) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (!this.cartScroll) {
        this.cartScroll = new BScroll(this.$els.cartList, {
          click: true,
          probeType: 3
        });
      } else {
        this.cartScroll.refresh();
      }
      return show;
    }
  },
  created() {},
  methods: {
    payNow() {
      if (this.totalPrice < this.minPrice) return false;
      window.alert(`结算${this.totalPrice}元`);
    },
    clearFood() {
      // 清空购物车
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    drop(el) {
      // four
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    toggleShow(el) {
      if (!this.totalCount) {
        // 这里的totalCount 在上面输出时要确保是数字，否则这里判断时字符串，判断无效
        return false;
      } else {
        this.fold = !this.fold;
      }
    }
  },
  transitions: {
    // beforeEnter 进去了，但是样式设置不上去，后两个时间没进去
    drop: {
      // 暂时不理解！！！
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); // 加号位置
            let x = rect.left - 32; // 两点之间的水平距离
            let y = -(window.innerHeight - rect.top - 22); // 两点之间竖直距离
            console.table({
              x: x,
              y: y,
              top: rect.top,
              left: rect.left,
              inner: window.innerHeight
            });
            el.style.display = ""; // 让小球显现
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        /*eslint-disable no-unused-vars*/
        let rf = el.offsetHeight; // 这一行代码目的: 强制让浏览器重新渲染使得小球动画得以实现
        this.$nextTick(() => {
          let inner = el.getElementsByClassName("inner-hook")[0];
          el.style.display = ""; // 让小球显现
          el.style.webkitTransform = "translate3d(0,0,0)";
          el.style.transform = "translate3d(0,0,0)";
          inner.style.webkitTransform = "translate3d(0,0,0)";
          inner.style.transform = "translate3d(0,0,0)";
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift(); // 将改变的那个小球删除！重新计算
        if (ball) {
          ball.show = false;
          el.style.display = "none";
        }
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';

.shopCart {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;

  .content {
    display: flex;
    height: 48px;
    background-color: #08121c;

    &.hightBgColor {
      background-color: #141d27;
    }

    .shop-left {
      flex: 1; // 根据视口伸缩
      font-size: 0;

      .inline {
        display: inline-block;
        vertical-align: top;
      }

      .logo-wrapper {
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        box-sizing: border-box;
        background: #14172d;

        .logo {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;

          &.hightBgColor {
            background-color: #00a0dc;

            .icon-shopping_cart {
              color: #fff;
            }
          }

          .count {
            position: absolute;
            right: -5px;
            top: -5px;
            width: 25px;
            height: 15px;
            border-radius: 10px;
            font-size: 10px;
            line-height: 15px;
            text-align: center;
            color: #fff;
            background-color: red;
            z-index: 6;
          }

          .icon-shopping_cart {
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
          }
        }
      }

      .price {
        margin: 12px 0;
        padding-right: 12px;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: #80858a;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);

        &.hightBgColor {
          color: #fff;
        }
      }

      .require {
        margin: 12px;
        font-size: 10px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
      }
    }

    .shop-right {
      flex: 0 0 105px;
      background: rgba(255, 255, 255, 0.2);
      width: 105px;
      padding: 0 8px;
      box-sizing: border-box;

      &.hightBgColor {
        background-color: #00b43c;

        .payPrice {
          color: #fff;
        }
      }

      .payPrice {
        height: 48px;
        font-size: 12px;
        font-weight: 700;
        line-height: 48px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;

      &.drop-transition {
        transition: all 0.3s cubic-bezier(0.38, -0.41, 0.7, 0.14);
      }

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all 0.3s linear;
      }
    }
  }

  .shop-list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;

    &.fade-transition {
      transform: translate3d(0, -100%, 0); /* -100% 是 将top:0 的高度列出来 */
      transition: all 0.4s;

      &.fade-enter, &.fade-leave {
        transform: translate3d(0, 0, 0);
      }

      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f3f3;
        border-1px(rgba(7, 17, 27, 0.1));
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .clear {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }

      .list-content {
        max-height: 230px;
        overflow: hidden;
        padding: 0 18px;
        background-color: #fff;

        .foodList {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          padding: 12px 0;
          box-sizing: border-box;
          border-1px(rgba(7, 17, 27, 0.1));

          &.foodFade-transition {
            transform: translate3d(0, 0, 0);
            transition: all 0.3s;
            opacity: 1;
          }

          &.foodFade-enter, &.foodFade-leave {
            transform: translate3d(-100%, 0, 0);
            opacity: 0;
          }

          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .list-right {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .price {
              padding: 0 12px 0 18px;
              font-size: 10px;
              color: rgb(240, 20, 20);

              .text {
                font-size: 14px;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  backdrop-filter: blur(10px);
  transition: all 0.3s;

  &.fade-transition {
    background-color: rgba(7, 17, 27, 0.6);
    opacity: 1;
  }

  &.fade-enter, &.fade-leave {
    background-color: rgba(7, 17, 27, 0);
    opacity: 0;
  }
}
</style>
