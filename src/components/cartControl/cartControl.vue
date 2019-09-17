<template>
  <div class="cartControl">
    <div class="decrease" v-show="food.count > 0" @click="delCount($event)" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="countNumber" v-show="food.count > 0">{{food.count}}</div>
    <div class="increase" @click="addCount($event)">
      <span class="inner icon-add_circle"></span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
    this.$nextTick(() => {
      // console.log(this.food);
    });
  },
  methods: {
    delCount(event) {
      if (!event._constructed) {
        // 解决pc端点击出现两次的现象
        return;
      }
      if (this.food.count > 0) {
        this.food.count--;
      } else {
        this.food.count = 0;
      }
    },
    addCount(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1); // 这里最初始时点击页面无法更新，采用这种方法来设置
      } else {
        this.food.count++;
      }
      this.$dispatch("cart.add", event.target); // one
    }
  }
};
</script>

<style lang="stylus">
.cartControl {
  font-size: 0;

  .decrease {
    display: inline-block;
    padding: 6px;
    transition: all 0.3s linear;

    &.move-transition {
      opacity: 1;
      transform: translate3d(0, 0, 0);

      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.3s linear;
        transform: rotate3d(0, 0, 0);
      }
    }

    &.move-enter, &.move-leave {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .increase {
    display: inline-block;
    padding: 6px;

    .inner {
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
  }

  .countNumber {
    display: inline-block;
    vertical-align: top;
    padding-top: 6px;
    width: 12px;
    font-size: 12px;
    text-align: center;
    color: rgb(147, 153, 159);
  }
}
</style>