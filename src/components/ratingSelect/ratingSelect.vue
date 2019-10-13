<template>
  <div class="ratingSelect">
    <div class="top-content">
      <div class="rating-tab border-1px">
        <div @click="select(2,$event)" class="item positive" :class="{'active' : selectType === 2}">
          {{desc.all}}
          <span>{{ratings.length}}</span>
        </div>
        <div @click="select(0,$event)" class="item positive" :class="{'active' : selectType === 0}">
          {{desc.positive}}
          <span>{{positives.length}}</span>
        </div>
        <div @click="select(1,$event)" class="item negative" :class="{'active' : selectType === 1}">
          {{desc.negative}}
          <span>{{negatives.length}}</span>
        </div>
      </div>
      <div class="toggleShow" @click="toggleShow" :class="{'showActive' : this.onlyContent}">
        <i class="icon-check_circle"></i>
        <span class="content">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const All = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: All
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data() {
    return {};
  },
  created() {
    console.log(this.ratings);
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.$dispatch("select.type", type);
      this.selectType = type;
    },
    toggleShow(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent = !this.onlyContent;
      this.$dispatch("toggle.content", this.onlyContent);
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin';

.ratingSelect {
  padding-top: 18px;

  .top-content {
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .rating-tab {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 0 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;

      .item {
        font-size: 12px;
        margin-right: 8px;
        padding: 8px 12px;
        font-size: 12px;
        text-align: center;
        line-height: 16px;
        border-radius: 2px;

        span {
          margin-left: 2px;
          font-size: 8px;
        }

        &.active {
          color: #fff;
        }

        &.positive {
          background-color: rgba(0, 160, 220, 0.2);

          &.active {
            background-color: rgb(0, 160, 220);
          }
        }

        &.negative {
          background-color: rgba(77, 85, 92, 0.2);

          &.active {
            background-color: rgb(77, 85, 92);
          }
        }
      }
    }

    .toggleShow {
      padding: 12px 18px;
      color: rgb(147, 153, 159);

      .icon-check_circle {
        font-size: 24px;
        line-height: 24px;
      }

      .content {
        vertical-align: super;
        font-size: 12px;
        line-height: 24px;
      }

      &.showActive {
        .icon-check_circle {
          color: #00c850;
        }

        .content {
          color: #000;
        }
      }
    }
  }
}
</style>