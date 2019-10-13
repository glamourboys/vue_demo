<template>
  <div class="ratings" v-el:ratings-wrapper>
    <div class="ratings-box">
      <div class="header">
        <div class="header-left">
          <span class="goal">{{seller.score}}</span>
          <h1 class="title">综合评分</h1>
          <span class="desc">高于周边商家{{seller.rankRate}}%</span>
        </div>

        <div class="header-right">
          <div class="wrapper">
            <h1 class="title">服务态度</h1>
            <star :size="36" :score="seller.score"></star>
            <span class="score">{{seller.score}}</span>
          </div>
          <div class="wrapper">
            <h1 class="title">商品评分</h1>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="wrapper">
            <h1 class="title">服务时间</h1>
            <span class="timed">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect :desc="desc" :only-content="onlyContent" :ratings="ratings"></ratingSelect>
      <div class="rating-content">
        <ul v-show="ratings && ratings.length !== 0">
          <li
            v-show="needShow(rating.rateType,rating.text)"
            v-for="rating in ratings"
            :key="rating.username"
            class="rating-list border-1px"
          >
            <img :src="rating.avatar" alt width="28px" />
            <span class="rateTime">{{rating.rateTime | formatDate}}</span>
            <div class="userInfo">
              <span class="user">{{rating.username}}</span>
              <div class="star-wrapper">
                <star :size="36" :score="rating.score"></star>
                <span class="timed" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="content">
              <p class="text">{{rating.text}}</p>
            </div>
            <div class="recommend">
              <span
                :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType === 0}"
              ></span>
              <span
                v-show="item && item.length !==0"
                v-for="item in rating.recommend"
                :key="item"
                class="item-list"
              >{{item}}</span>
            </div>
          </li>
        </ul>
        <div class="no-content" v-show="!ratings || ratings.length === 0">暂无评论</div>
      </div>
    </div>
  </div>
</template>

<script>
const ERR_OK = 0; // 状态码
const All = 2; //  全部列的状态
import dayjs from "dayjs";
import BScroll from "better-scroll";
import split from "components/split/split";
import ratingselect from "components/ratingSelect/ratingSelect";
import star from "components/star/star";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      desc: {
        all: "全部",
        positive: "满意",
        negative: "不满意"
      },
      onlyContent: false,
      selectType: All,
      ratings: []
    };
  },
  components: {
    split,
    ratingselect,
    star
  },
  created() {
    this.$http.get("/api/ratings").then(Response => {
      Response = Response.body; // 在body中
      if (Response.errno === ERR_OK) {
        this.ratings = Response.data;
        this.$nextTick(() => {
          // 延迟调用
          console.log("ratings", this.ratings);
          this._initScroll(); // 初始化插件
        });
      }
    });
    console.log("seller", this.seller);
  },
  methods: {
    _initScroll() {
      // scroll 内置去除了点击事件，要加对应属性
      this.ratingsScroll = new BScroll(this.$els.ratingsWrapper, {
        click: true
      });
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
  filters: {
    formatDate(time) {
      let myDate = new Date(time);
      return dayjs(myDate).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  events: {
    // 接收子组件ratingselect所传过来的方法
    "select.type"(type) {
      this.selectType = type;
      this.$nextTick(() => {
        // 延迟函数，待dom渲染后再更新scroll插件
        this.ratingsScroll.refresh();
      });
    },
    "toggle.content"(only) {
      this.onlyContent = only;
      this.$nextTick(() => {
        this.ratingsScroll.refresh();
      });
    }
  }
};
</script>

<style lang="stylus">
@import './../../common/stylus/mixin';

.ratings {
  position: absolute;
  top: 175px;
  bottom: 0;
  left: 0;
  z-index: 888;
  width: 100%;
  overflow: hidden;

  .ratings-box {
    .header {
      margin-bottom: 18px;
      display: flex;

      .header-left {
        margin-top: 18px;
        flex: 0 0 137px;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.2);
        text-align: center;

        @media only screen and (max-width: 320px) {
          flex: 0 0 110px;
          width: 110px;
        }

        @media only screen and (min-width: 376px) and (max-width: 414px) {
          flex: 0 0 145px;
          width: 145px;
        }

        .goal {
          display: inline-block;
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
        }

        .title {
          margin-top: 6px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 12px;
        }

        .desc {
          margin: 8px 6px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
      }

      .header-right {
        flex: 1;
        padding-left: 24px;
        margin-top: 18px;

        @media screen and (max-width: 320px) {
          flex: 1;
          padding-left: 6px;
        }

        @media screen and (min-width: 376px) and (max-width: 414px) {
          flex: 1;
          padding-left: 36px;
        }

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 8px;

          .title {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }

          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }

          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
            line-height: 18px;
          }

          .timed {
            padding-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 18px;
          }
        }
      }
    }

    .rating-content {
      margin: 0 18px;

      .rating-list {
        padding: 18px 0;
        border-1px(rgba(7, 17, 27, 0.2));

        &:last-child {
          border-none();
        }

        img {
          border-radius: 50%;
        }

        .rateTime {
          position: absolute;
          top: 18px;
          right: 0;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }

        .userInfo {
          display: inline-block;
          vertical-align: top;
          padding-left: 12px;

          .user {
            font-size: 10px;
            color: rgb(7, 17, 27);
            line-height: 12px;
          }

          .star-wrapper {
            margin-top: 4px;

            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: middle;
            }

            .timed {
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 12px;
            }
          }
        }

        .content {
          margin: 6px 0 8px 45px;

          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }
        }

        .recommend {
          margin-left: 45px;
          line-height: 16px;

          .icon-thumb_down {
            display: inline-block;
            color: rgb(147, 153, 159);
            margin-right: 8px;
            vertical-align: top;
          }

          .icon-thumb_up {
            display: inline-block;
            color: rgb(0, 160, 220);
            margin-right: 8px;
            vertical-align: top;
          }

          .item-list {
            display: inline-block;
            vertical-align: top;
            font-size: 9px;
            padding: 0 6px;
            margin: 0 8px 4px 0;
            color: rgb(147, 153, 159);
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            overflow: hidden; // 隐藏文字
            text-overflow: ellipsis; // 显示...
            white-space: nowrap; // 不换行
            width: 42px;
          }
        }
      }

      .no-content {
        text-align: center;
        color: rgb(147, 153, 159);
        padding: 10px;
      }
    }
  }
}
</style>