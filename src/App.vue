<template>
  <div>
    <my-header :seller="seller"></my-header>
    <div class="tab border-1px">
      <div class="tab-item" v-for="(index,item) in tabs" :key="index">
        <a v-link="{path:item.path}">{{item.name}}</a>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    <!-- <div class="footer">京公网安备 666666666666号&nbsp;|&nbsp;京ICP证190819号</div> -->
  </div>
</template>

<script>
import myHeader from "components/header/header";
const ERR_OK = 0;
export default {
  components: {
    myHeader
  },
  data() {
    return {
      tabs: [
        { name: "商品", path: "/goods", index: 0 },
        { name: "评论", path: "/seller", index: 1 },
        { name: "商家", path: "/ratings", index: 2 }
      ],
      seller: {}
    };
  },
  created() {
    this.$http.get("/api/seller").then(res => {
      res = res.body; // 拿到对象
      if (res.errno === ERR_OK) {
        this.seller = res.data;
      }
    });
  }
};
</script>

<style lang="stylus">
@import 'common/stylus/mixin.styl';

#app {
  width: 100%;

  .tab {
    position: relative;
    z-index: 3;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    font-size: 12px;
    line-height: 40px;
    text-align: center;
    color: #666;
    background-color: #000;
  }
}
</style>
