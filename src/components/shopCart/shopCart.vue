
<template>
  <div class="shopCart">
    <div class="content" :class="{'hightBgColor' : totalPrice > 0}">
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
      <div class="shop-right" :class="changePay">
        <div class="payPrice">{{DiffPrice}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" v-show="ball.show" class="ball" transition="drop">
        <div class="inner inner-hook"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: []
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
      return `${total}`;
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
    }
  },
  methods: {
    drop(el) {
      // four
      console.log("shopcart", el);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    }
  },
  transitions: {
    // beforeEnter 就去了，但是样式设置不上去，后两个时间没进去
    drop: {
      // 暂时不理解！！！
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          console.log(ball);
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); // 加号位置
            let x = rect.left - 32; // 两点之间的水平距离
            let y = -(window.innerHeight - rect.top - 22); // 两点之间竖直距离
            console.table({
              'x': x,
              'y': y,
              'top': rect.top,
              'left': rect.left,
              'inner': window.innerHeight
            });
            el.style.display = ""; // 让小球显现
            el.style.webkitTransform = `transform3d(0,${y}px,0)`;
            el.style.transform = `transform3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `transform3d(${x}px,0,0)`;
            inner.style.transform = `transform3d(${x}px,0,0)`;
            console.log(el.style, inner.style);
          }
        }
      },
      enter(el) {
        /*eslint-disable no-unused-vars*/
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          let inner = el.getElementsByClassName("inner-hook")[0];
          el.style.display = ""; // 让小球显现
          el.style.webkitTransform = "transform3d(0,0,0)";
          el.style.transform = "transform3d(0,0,0)";
          inner.style.webkitTransform = "transform3d(0,0,0)";
          inner.style.transform = "transform3d(0,0,0)";
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        console.log("ball", ball);
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
.shopCart {
  position: fixed;
  z-index: 10;
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
        transition: all 0.3s cubic-bezier(0.62, -0.52, 0.83, 0.67);
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
}
</style>
