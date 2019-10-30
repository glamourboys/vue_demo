<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabel"
      :useTransition="false"
      ref="tabBar"
      :showSlider="true"
      class="border-bottom-1px"
    >
      <cube-tab v-for="(item, index) in tabList" :label="item.label" :key="index"></cube-tab>
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        ref="slide"
        :loop="false"
        :auto-play="false"
        :showDots="false"
        :options="slideOptions"
        :initialIndex="index"
        @change="onChange"
        @scroll="onScroll"
      >
        <cube-slide-item v-for="(tab,index) in tabList" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    tabList: {
      type: Array,
      default() {
        return [];
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialIndex,
      slideOptions: {
        // 这里是better-scroll配置
        listenScroll: true, // 监听滚动事件
        probeType: 3,
        directionLockThreshold: 0 // 锁定移动的方向
      }
    };
  },
  computed: {
    selectedLabel: {
      get() {
        // 设置tab本身的内容变化
        return this.tabList[this.index].label;
      },
      set(newVal) {
        // tab切换时设置index,以使slide部分同步滑动
        this.index = this.tabList.findIndex(value => {
          return value.label === newVal;
        });
      }
    }
  },
  mounted() {
    this.onChange(this.index); // 挂载的时候调用
  },
  methods: {
    onChange(current) {
      // slide中切换以获取对应index(索引)
      this.index = current;
      const instance = this.$refs.component[current]; // 获取到对应动态组件
      if (instance && instance._fetch) {
        // 每当切换当对应组件且组件中含有对应方法时，调用
        instance._fetch();
      }
    },
    onScroll(pos) {
      // 滚动事件
      const slideScroll = this.$refs.slide.slide.scrollerWidth;
      const tabWidth = this.$refs.tabBar.$el.clientWidth;
      const transX = (-pos.x / slideScroll) * tabWidth;
      this.$refs.tabBar.setSliderTransform(transX);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.tab {
  display: flex;
  flex-direction: column;
  height: 100%;

  >>> .cube-tab { // >>> .cube-tab  这里要再看下
    padding: 10px 0;
  }

  .slide-wrapper {
    flex: 1; // 这里说明下,该写法会将剩余父盒子空间全部占据完,适合在不写宽高的盒子使用
    overflow: hidden;
  }
}
</style>
