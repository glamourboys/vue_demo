<template>
  <div class="header" @click="showDetail">
    <div class="header-wrapper">
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%" alt />
      </div>
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64" alt />
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
          <div v-if="seller.supports" class="support">
            <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
          <div v-if="seller.supports" class="support-count">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import supportIco from "components/supportIco/support-ico";
// import popupMixin from "common/mixins/popup";

export default {
  // mixins: [popupMixin],
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  components: { supportIco },
  methods: {
    showDetail() {
      this.headerDetailAPI =
        this.headerDetailAPI ||
        this.$createHeaderDetail({
          $props: {
            seller: "seller"
          }
        });
      this.headerDetailAPI.show();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';

.header-wrapper {
  position: relative;
  overflow: hidden;
  color: $color-white;
  background-color: $color-background-ss;

  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(10px);
  }

  .content-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 24px 12px 18px 24px;

    .avatar {
      flex: 0 0 64px;
      width: 64px;
      margin-right: 16px;

      img {
        border-radius: 2px;
      }
    }

    .content {
      flex: 1;
      position: relative;

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .brand {
          width: 30px;
          height: 18px;
          bg-image('images/brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: $fontsize-large;
          font-weight: bold;
          line-height: 18px;
        }
      }

      .description {
        font-size: $fontsize-small;
        line-height: $fontsize-small;
        margin-bottom: 10px;
      }

      .support {
        display: flex;
        align-items: center;
        margin-bttom: 2px;

        .support-ico {
          margin-right: 4px;
        }

        .text {
          line-height: 12px;
          font-size: $fontsize-small-s;
        }
      }

      .support-count {
        position: absolute;
        right: 12px;
        bottom: -4px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 14px;
        background: $color-background-sss;

        .count {
          font-size: $fontsize-small-s;
        }

        .icon-keyboard_arrow_right {
          margin-left: 2px;
          line-height: 24px;
          font-size: $fontsize-small-s;
        }
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    background: $color-background-sss;

    .bulletin-title {
      flex: 0 0 22px;
      width: 22px;
      height: 12px;
      margin-right: 4px;
      bg-image('images/bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: $fontsize-small-s;

      .icon-keyboard_arrow_right {
        flex: 0 0 10px;
        width: 10px;
        font-size: $fontsize-small-s;
      }
    }
  }
}
</style>
