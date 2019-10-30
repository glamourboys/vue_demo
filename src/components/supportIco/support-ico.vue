<template>
  <span class="support-ico" :class="iconDiff"></span>
</template>

<script>
export default {
  name: "support-ico",
  props: {
    size: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    }
  },
  computed: {
    iconDiff() {
      const classMap = [
        "decrease",
        "discount",
        "special",
        "invoice",
        "guarantee"
      ];
      return `icon-${this.size} ${classMap[this.type]}`;
    }
  },
  data() {
    return {
      value: 5
    };
  },
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '~common/stylus/mixin';

.support-ico {
  display: inline-block;
  background-repeat: no-repeat;
}

.icon-1 {
  width: 12px;
  height: 12px;
  background-size: 12px 12px;

  &.decrease {
    bg-image('images/decrease_1');
  }

  &.discount {
    bg-image('images/discount_1');
  }

  &.guarantee {
    bg-image('images/guarantee_1');
  }

  &.invoice {
    bg-image('images/invoice_1');
  }

  &.special {
    bg-image('images/special_1');
  }
}

.icon-2 {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;

  &.decrease {
    bg-image('images/decrease_2');
  }

  &.discount {
    bg-image('images/discount_2');
  }

  &.guarantee {
    bg-image('images/guarantee_2');
  }

  &.invoice {
    bg-image('images/invoice_2');
  }

  &.special {
    bg-image('images/special_2');
  }
}

.icon-3 {
  width: 12px;
  height: 12px;
  background-size: 12px 12px;

  &.decrease {
    bg-image('images/decrease_3');
  }

  &.discount {
    bg-image('images/discount_3');
  }

  &.guarantee {
    bg-image('images/guarantee_3');
  }

  &.invoice {
    bg-image('images/invoice_3');
  }

  &.special {
    bg-image('images/special_3');
  }
}

.icon-4 {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;

  &.decrease {
    bg-image('images/decrease_4');
  }

  &.discount {
    bg-image('images/discount_4');
  }

  &.guarantee {
    bg-image('images/guarantee_4');
  }

  &.invoice {
    bg-image('images/invoice_4');
  }

  &.special {
    bg-image('images/special_4');
  }
}
</style>
