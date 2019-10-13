<template>
  <div class="foods" v-show="showFood" transition="food" v-el:foods>
    <div class="content">
      <div class="header">
        <img :src="food.image" alt />
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="desc">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sellcount">月售{{food.sellCount}}份</span>
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
        <div
          class="cartAdd"
          @click="buyAdd"
          v-show="!food.count || food.count === 0"
          transition="addFade"
        >加入购物车</div>
        <div class="cartControl-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
      </div>
      <split></split>
      <!-- v-show="food.info && food.info != ''"  -->
      <div class="introduce" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <div class="content">{{food.info}}</div>
      </div>
      <split></split>
      <div class="myratings">
        <h1 class="title">商品评价</h1>
        <div class="ratingselect-wrapper">
          <ratingselect
            :food="food"
            :ratings="food.ratings"
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
          ></ratingselect>
        </div>
        <div class="rating-content">
          <ul v-show="food.ratings && food.ratings.length">
            <li
              v-show="needShow(rating.rateType,rating.text)"
              v-for="rating in food.ratings"
              :key="rating.rateTime"
              class="rating-list border-1px"
            >
              <div class="ratingTime">{{rating.rateTime | formatDate}}</div>
              <p class="ratingDesc">
                <i
                  :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType === 0}"
                ></i>
                <span class="text">{{rating.text}}</span>
              </p>
              <div class="userInfo">
                <span class="user">{{rating.username}}</span>
                <img :src="rating.avatar" alt width="12" height="12" />
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*  评价类型 */
// const POSITIVE = 0;
// const NEGATIVE = 1;
const All = 2;

import BScroll from "better-scroll";
import Vue from "vue";
import dayjs from "dayjs";
import cartcontrol from "components/cartControl/cartControl";
import split from "components/split/split";
import ratingselect from "components/ratingSelect/ratingSelect";
export default {
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      showFood: false,
      selectType: All,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  methods: {
    show() {
      this.showFood = true;
      this.selectType = All;
      this.onlyContent = false;
      this.$nextTick(() => {
        // 在dom渲染后 来加载插件
        console.log(this.food.ratings);

        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$els.foods, {
            click: true,
            probeType: 3
          });
        } else {
          this.foodScroll.refresh();
        }
      });
    },
    hide() {
      this.showFood = false;
    },
    buyAdd(event) {
      console.log(event);
      if (!event._constructed) {
        return;
      }
      this.$dispatch("cart.add", event.target); // 子组件给父组件传递
      Vue.set(this.food, "count", 1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === All) {
        return true;
      } else {
        return this.selectType === type;
      }
    }
  },
  events: {
    // 接收子组件ratingselect所传过来的方法
    "select.type"(type) {
      this.selectType = type;
      this.$nextTick(() => {
        // 延迟函数，待dom渲染后再更新scroll插件
        this.foodScroll.refresh();
      });
    },
    "toggle.content"(only) {
      this.onlyContent = only;
      this.$nextTick(() => {
        this.foodScroll.refresh();
      });
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return dayjs(date).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';

.foods {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 48px;
  z-index: 99;
  background-color: #fff;
  overflow: hidden;

  &.food-transition {
    transition: all 0.4s linear;
    transform: translate3d(0, 0, 0);
  }

  &.food-enter, &.food-leave {
    transform: translate3d(100%, 0, 0);
  }

  /* 黑魔法 */
  .header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .back {
      position: absolute;
      left: 0;
      top: 10px;

      .icon-arrow_lift {
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }

  /* 黑魔法 */
  .desc {
    margin: 18px;
    position: relative;

    h1 {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }

    .detail {
      margin-top: 8px;

      .sellcount, .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
      }

      .sellcount {
        margin-right: 12px;
      }
    }

    .price {
      margin: 18px 0;

      .nowPrice {
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        line-height: 24px;
        margin-right: 6px;

        span {
          font-size: 10px;
          font-weight: normal;
        }
      }

      .oldPrice {
        font-size: 10px;
        font-weight: 700;
        line-height: 24px;
        color: rgb(141, 153, 159);

        span {
          font-weight: normal;
        }
      }
    }

    .cartAdd {
      position: absolute;
      bottom: 0px;
      right: 12px;
      z-index: 10;
      border-radius: 24px;
      font-size: 10px;
      color: #fff;
      line-height: 12px;
      text-align: center;
      padding: 6px 12px;
      background-color: rgb(0, 160, 220);

      &.addFade-transition {
        opacity: 1;
        transition: all 0.1s;
      }

      &.addFade-enter, &.addFade-leave {
        opacity: 0;
      }
    }

    .cartControl-wrapper {
      position: absolute;
      bottom: -5px;
      right: 12px;
    }
  }

  .introduce {
    padding: 18px;

    .content {
      margin: 6px 8px 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }

  .myratings {
    margin-top: 18px;

    h1 {
      padding: 0 18px;
      font-size: 16px;
    }

    .rating-content {
      margin: 16px 18px;

      .rating-list {
        position: relative;
        padding: 16px 0;
        border-1px(rgba(7, 17, 27, 0.1));

        &:last-child {
          border-none();
        }

        .ratingTime {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }

        .ratingDesc {
          margin-top: 6px;
          font-size: 12px;
          line-height: 16px;

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }

          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .text {
            margin-left: 4px;
            color: rgb(7, 17, 27);
          }
        }

        .userInfo {
          position: absolute;
          top: 16px;
          right: 0;

          .user {
            margin-right: 6px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
            vertical-align: middle;
          }

          img {
            border-radius: 50%;
          }
        }
      }

      .no-rating {
        font-size: 12px;
        color: rgb(147, 153, 159);
        text-align: center;
        padding: 20px;
      }
    }

    .ratingselect-content {
      .rating-list {
        margin: 0 18px;
        padding: 16px 0;
        border-1px(rgba(7, 17, 27, 0.1));
      }
    }
  }
}
</style>