<template>
  <div id="app">
    <v-header :seller="seller" @detail="toggleShow"></v-header>
    <tab :tabList="tabList"></tab>
  </div>
</template>

<script>
import vHeader from "components/header/header";
import tab from "components/tab/tab";
import Goods from "components/goods/goods";
import Ratings from "components/ratings/ratings";
import Seller from "components/seller/seller";
import { getSeller } from "api"; // 接口调用
export default {
  name: "app",
  components: {
    vHeader,
    tab
  },
  data() {
    return {
      seller: {},
      tabList: [
        {
          label: "goods",
          component: Goods,
          data: { seller: this.seller }
        },
        {
          label: "seller",
          component: Seller,
          data: { seller: this.seller }
        },
        {
          label: "ratings",
          component: Ratings,
          data: { seller: this.seller }
        }
      ]
    };
  },
  created() {
    this._getSeller();
  },
  methods: {
    _getSeller() {
      getSeller().then(seller => {
        this.seller = seller;
        console.log(this.seller);
      });
    },
    toggleShow(e) {
      this.show = e;
      console.log(this.show);
    }
  }
};
</script>

<style lang="stylus"></style>
