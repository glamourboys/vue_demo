<template>
  <div class="star" :class="starType">
    <span
      v-for="itemClass in itemClasses"
      :class="itemClass"
      class="star-item"
      :key="itemClass"
      track-by="$index"
    ></span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_OFF = "off";
const CLS_HALF = "half";
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      /* 此处处理后 均为 正数 或 半数 */
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0; // 判断是否有小数
      let integer = Math.floor(score); // 整数部分数字
      for (let i = 0; i < integer; i++) {
        // push 进 正数星星
        result.push(CLS_ON);
      }

      if (hasDecimal) {
        // 有小数则push半星
        result.push(CLS_HALF);
      }

      while (result.length < LENGTH) {
        //  判断未到5星,push空白星
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

.star {
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &.last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./img/star24_on');
      }

      &.off {
        bg-image('./img/star24_off');
      }

      &.half {
        bg-image('./img/star24_half');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &.last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./img/star36_on');
      }

      &.off {
        bg-image('./img/star36_off');
      }

      &.half {
        bg-image('./img/star36_half');
      }
    }
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &.last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./img/star48_on');
      }

      &.off {
        bg-image('./img/star48_off');
      }

      &.half {
        bg-image('./img/star48_half');
      }
    }
  }
}
</style>