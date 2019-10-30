<template>
  <transition name="fade">
    <div v-show="visible" class="header-detail">
      <div class="detailWrapper">
        <div class="detailContent">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score" v-show="seller.score"></star>
          </div>
          <div class="line-wrapper">
            <line-title :title="title[0]"></line-title>
          </div>
          <ul v-if="seller.supports" class="supportWrapper">
            <li v-for="(item,index) in seller.supports" :key="index" class="support-list">
              <support-ico :size="2" :type="seller.supports[index].type"></support-ico>
              <span class="desc">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="line-wrapper">
             <line-title :title="title[1]"></line-title>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import star from "components/star/star"; // 评分组件
import lineTitle from "components/lineTitle/lineTitle"; // title信息组件
import popupMixin from "common/mixins/popup";
import supportIco from "components/supportIco/support-ico";

export default {
  mixins: [popupMixin], // 混入写法,可多次引入,互不冲突
  name: "header-detail",
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    star,
    lineTitle,
    supportIco
  },
  created() {
    console.log(this.title);
  },
  methods: {
    show() {
      this.visible = true;
    }
  }
};
</script>

<style lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.header-detail {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background-s;
  backdrop-filter: blur(15px);
  color: $color-white;
  opacity: 1;
  z-index: 999;

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.5s;
  }

  &.fade-enter, &.fade-leave-to { /* .fade-leave-active below version 2.1.8 */
    opacity: 0;
  }

  .detailWrapper {
    display: inline-block;
    width: 100%;
    min-height: 100%;

    .detailContent {
      margin-top: 64px;
      padding-bottom: 64px;

      .name {
        line-height: 16px;
        text-align: center;
        font-size: $fontsize-large;
        font-weight: 700;
      }

      .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
      }

      .supportWrapper {
        margin: 0 auto;
        width: 80%;

        .support-list {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 12px;
          margin-bottom: 12px;

          &:last-child {
            margin: 0;
          }

          .support-ico {
            margin-right: 6px;
          }

          .desc {
            font-size: $fontsize-small;
            line-height: 12px;
          }
        }
      }

      .bulletin {
        width: 80%;
        margin: 0 auto;

        .content {
          padding: 0 12px;
          font-size: $fontsize-small;
          line-height: 24px;
        }
      }
    }
  }

  .close {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: -64px auto 0 auto;
    clear: both;
    color: rgba(255, 255, 255, 0.5);
    font-size: $fontsize-large-xxxx;
  }
}
</style>
