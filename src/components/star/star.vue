<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemAll" :key="index" class="star-item" :class="itemClass"></span>
  </div>
</template>

<script>
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";
const Length = 5;
export default {
  props: {
    size: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value: ""
    };
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemAll() {
      let result = [];
      const score = Math.floor(this.score * 2) / 2; // 这里算出来的是要不是正数，要不就是半数；
      const hasDecimal = score % 1 !== 0; // 这里是判断是否有小数！
      const integer = Math.floor(score); // 取出其正数部分！
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON); // return 不能return 否则后面会出问题
      }
      if (hasDecimal) {
        // 若存在小数
        result.push(CLS_HALF);
      }

      while (result.length < Length) {
        result.push(CLS_OFF);
      }
      console.log(result);
      return result;
    }
  },
  methods: {}
};
</script>

<style lang="stylus">
@import '~common/stylus/mixin.styl';

.star {
  display: flex;
  align-items: center;
  justify-content: center;

  .star-item {
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('images/star48_on');
      }

      &.half {
        bg-image('images/star48_half');
      }

      &.off {
        bg-image('images/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('images/star36_on');
      }

      &.half {
        bg-image('images/star36_half');
      }

      &.off {
        bg-image('images/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('images/star24_on');
      }

      &.half {
        bg-image('images/star24_half');
      }

      &.off {
        bg-image('images/star24_off');
      }
    }
  }
}
</style>
