<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt width="64" height="64" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="showDetail">
        <span class="text">{{seller.supports.length}}个</span>
        <i class="icon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="icon"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt />
    </div>
    <div class="model-detail" v-show="modelShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="detail-title">{{seller.name}}</h1>
          <div class="detail-star">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supportsList">
            <li v-for="item in seller.supports" class="support-item" :key="item">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家广告</div>
            <div class="line"></div>
          </div>
          <div class="detail-bulletin">
            <div class="content">{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
/* 导入组件 */
import star from "components/star/star";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    /* 注册组件 */
    star
  },
  data() {
    return {
      modelShow: false /* 遮罩层显隐 */
    };
  },
  created() {
    /* 这个周期函数 可以请求数据;这里处理不同类型的文字对应的图片名 */
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail() {
      this.modelShow = true;
    },
    hideDetail() {
      this.modelShow = !this.modelShow;
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '../../common/stylus/mixin';

.header {
  position: relative;
  color: #fff;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;

      .title {
        padding: 2px 0 8px 0;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          bg-image('./img/brand');
          vertical-align: top;
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }

      .description {
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
      }

      .supports {
        padding: 10px 0 2px 0;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: middle;

          &.decrease {
            bg-image('./img/decrease_1');
          }

          &.discount {
            bg-image('./img/discount_1');
          }

          &.guarantee {
            bg-image('./img/guarantee_1');
          }

          &.invoice {
            bg-image('./img/invoice_1');
          }

          &.special {
            bg-image('./img/special_1');
          }

          background-size: 12px 12px;
          background-repeat: no-repeat;
        }

        .description {
          display: inline-block;
          margin-left: 4px;
          font-size: 10px;
          font-weight: 200;
          line-height: 12px;
        }
      }
    }

    .supports-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      color: #fff;
      font-weight: 200;
      text-align: center;
      height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);

      .text {
        vertical-align: top;
        font-size: 10px;
        line-height: 24px;
      }

      .icon {
        margin-left: 2px;
        font-size: 10px;
        line-height: 24px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    color: #fff;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);

    /* 公告栏这里,为了消除图片与文字之间的间隙,font-size:0; 但是发现文字省略号消失,解决办法,float或者 将元素之间挨着写,font-size:0 去除 */
    .icon {
      display: inline-block;
      width: 22px;
      height: 12px;
      bg-image('./img/bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: middle;
    }

    .bulletin {
      margin-left: 4px;
      font-size: 10px;
      font-weight: 200;
      line-height: 28px;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      bottom: 0;
      font-weight: 200;
      font-size: 12px;
      line-height: 28px;
    }
  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(10px);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .model-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    overflow: auto;
    transition: all 0.5s;

    &.fade-transition {
      opacity: 1;
      background-color: rgba(7, 17, 27, 0.8);
    }

    &.fade-enter, &.fade-leave {
      opacity: 0;
      background-color: rgba(7, 17, 27, 0);
    }

    .detail-wrapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;

        .detail-title {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          line-height: 16px;
        }

        .detail-star {
          text-align: center;
          margin-top: 16px;
          padding: 2px 0;
        }

        .title {
          display: flex;
          width: calc(100vw - 72px);
          margin: 28px auto 24px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: solid 2px rgba(255, 255, 255, 0.2);
          }

          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: bold;
          }
        }

        .supportsList {
          width: calc(100vw - 72px);
          margin: 24px auto 0 auto;

          .support-item {
            margin: 0 12px 12px 12px;

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: middle;

              &.decrease {
                bg-image('./img/decrease_2');
              }

              &.discount {
                bg-image('./img/discount_2');
              }

              &.guarantee {
                bg-image('./img/guarantee_2');
              }

              &.invoice {
                bg-image('./img/invoice_2');
              }

              &.special {
                bg-image('./img/special_2');
              }

              background-size: 16px 16px;
              background-repeat: no-repeat;
            }

            .text {
              margin-left: 6px;
              font-size: 12px;
              line-height: 12px;
            }
          }
        }

        .detail-bulletin {
          width: calc(100vw - 72px);
          margin: 0 auto;

          .content {
            padding: 0 12px;
            font-size: 12px;
            color: white;
            line-height: 24px;
          }
        }
      }
    }

    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 32px auto;

      .icon-close {
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>