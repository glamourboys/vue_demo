<template>
  <div class="seller" v-el:seller-wrapper>
    <div class="seller-content">
      <div class="seller-header">
        <div class="header-top border-1px">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="goodTotal">(661)</span>
            <span class="total">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="like" @click="likeMe">
          <span class="icon-favorite" :class="{'active' : favorite}"></span>
          <span class="favorite" :class="{'active' : favorite}">{{favoriteText}}</span>
        </div>
        <div class="header-bottom">
          <div class="minPrice block">
            <h1>起送价</h1>
            <p>
              {{seller.minPrice}}
              <span>元</span>
            </p>
          </div>
          <div class="deliveryPrice block">
            <h1>商家配送</h1>
            <p>
              {{seller.deliveryPrice}}
              <span>元</span>
            </p>
          </div>
          <div class="deliveryTime block">
            <h1>平均配送时间</h1>
            <p>
              {{seller.deliveryTime}}
              <span>分钟</span>
            </p>
          </div>
        </div>
      </div>
      <split></split>
      <div class="seller-bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="detail border-1px">{{seller.bulletin}}</p>
        <ul v-if="seller.supports" class="supportsList">
          <li v-for="item in seller.supports" class="support-item border-1px" :key="item.type">
            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text">{{seller.supports[$index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-view">
        <h1 class="title">商家实景</h1>
        <div class="img-wrapper" v-el:img-box>
          <ul v-show="seller.pics" v-el:img-ul>
            <li v-for="pic in seller.pics" :key="pic" class="img-list">
              <img :src="pic" alt width="120" height="90" />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="wrapper" v-show="seller.infos">
          <li v-for="info in seller.infos" :key="info" class="info-list border-1px">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import split from "components/split/split";
import star from "components/star/star";
import { saveTotal, loadLocalTotal } from "common/util/util";
export default {
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  components: {
    split,
    star
  },
  data() {
    return {
      favorite: (() => {
        return loadLocalTotal(this.seller.id, "favorite");
      })()
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    console.log(loadLocalTotal);
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  computed: {
    // 判断的内容放在计算属性中，实时判断
    favoriteText() {
      return this.favorite ? "已收藏" : "未收藏";
    }
  },
  watch: {
    seller() {
      this._initScroll();
      this._initPics();
    }
  },
  ready() {
    // vue 1.0
    // 优先于watch
    this._initScroll();
    this._initPics();
  },
  methods: {
    likeMe(event) {
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      saveTotal(this.seller.id, "favorite", this.favorite);
    },
    _initScroll() {
      if (!this.sellerScroll) {
        this.sellerScroll = new BScroll(this.$els.sellerWrapper, {
          click: true
        });
      } else {
        this.sellerScroll.refresh();
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let picMargin = 6;
        let imgWidth =
          (picWidth + picMargin) * this.seller.pics.length - picMargin;
        this.$els.imgUl.style.width = imgWidth + "px";

        this.$nextTick(() => {
          if (!this.imgScroll) {
            this.imgScroll = new BScroll(this.$els.imgBox, {
              scrollX: true,
              eventPassthrough: "vertical"
            });
          } else {
            this.imgScroll.refresh();
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus">
@import './../../common/stylus/mixin';

.seller {
  position: absolute;
  top: 175px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  overflow: hidden;
  margin-top: 18px;

  .seller-header {
    position: relative;
    margin: 18px;

    .header-top {
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;

      .title {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }

      .star {
        display: inline-block;
        vertical-align: top;
      }

      .goodTotal, .total {
        font-size: 10px;
        color: rgb(77, 85, 93);
        line-height: 18px;
      }

      .goodTotal {
        margin: 0 8px;
      }

      .total {
        margin-left: 4px;
      }
    }

    .like {
      position: absolute;
      right: 0;
      top: 0;
      width: 32px;
      text-align: center;

      .icon-favorite, .favorite {
        display: inline-block;
      }

      .icon-favorite {
        font-size: 24px;
        color: rgb(147, 153, 159);
        line-height: 24px;

        &.active {
          color: rgb(240, 20, 20);
        }
      }

      .favorite {
        margin-top: 4px;
        font-size: 10px;
        color: rgb(77, 85, 93);
        line-height: 10px;

        &.active {
          color: #000;
        }
      }
    }

    .header-bottom {
      display: flex;
      margin-top: 18px;

      .block {
        flex: 1;
        text-align: center;

        h1 {
          margin-bottom: 4px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }

        p {
          font-size: 24px;
          color: rgb(7, 17, 27);
          line-height: 24px;

          span {
            font-size: 10px;
          }
        }
      }

      .deliveryPrice, .minPrice {
        border-right: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }

  .seller-bulletin {
    margin: 18px;
    margin-bottom: 0;
    border-1px(rgba(7, 17, 27, 0.1));

    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      margin-bottom: 8px;
    }

    .detail {
      padding: 0 12px 16px 12px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 12px;
      color: rgb(240, 20, 20);
      line-height: 24px;
    }

    .supportsList {
      .support-item {
        padding: 16px 12px;
        border-1px(rgba(7, 17, 27, 0.1));

        &:last-child {
          border-none;
        }

        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
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

          background-size: 16px 16px;
          background-repeat: no-repeat;
        }

        .text {
          margin-left: 6px;
          font-size: 12px;
          line-height: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
  }

  .seller-view {
    margin: 18px 0 18px 18px;

    .title {
      margin-bottom: 12px;
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }

    .img-wrapper {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;

      ul {
        width: 100%;
        font-size: 0;

        .img-list {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .seller-info {
    margin: 18px 18px 0 18px;

    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      line-height: 14px;
      padding-bottom: 12px;
      border-1px(rgba(7, 17, 27, 0.1));
    }

    .info-list {
      padding: 16px 12px;
      font-size: 12px;
      color: rgb(7, 17, 27);
      line-height: 16px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
      }
    }
  }
}
</style>