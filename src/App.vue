<template>
  <div>
    <my-header :seller="seller"></my-header>
    <div class="tab border-1px">
      <div class="tab-item" v-for="(index,item) in tabs" :key="index">
        <a v-link="{path:item.path}">{{item.name}}</a>
      </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
    <!-- <keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。 -->
  </div>
</template>

<script>
import myHeader from "components/header/header";
import { urlParse } from "common/util/util";
const ERR_OK = 0;
export default {
  components: {
    myHeader
  },
  data() {
    return {
      tabs: [
        { name: "商品", path: "/goods", index: 0 },
        { name: "评论", path: "/ratings", index: 1 },
        { name: "商家", path: "/seller", index: 2 }
      ],
      seller: {
        id: (() => {
          /* 立即执行函数来获取id值 */
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get("/api/seller?" + this.seller.id).then(res => {
      res = res.body; // 拿到对象
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data); // 这里写这个目的是为了不覆盖掉id
        console.log(this.seller, urlParse());
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
    z-index: 2;
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
