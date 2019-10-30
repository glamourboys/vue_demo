<template>
  <div class="seller">seller组件</div>
</template>

<script>
import { getSeller } from "api";
export default {
  name: "seller",
  props: {},
  data() {
    return {
      seller: {}
    };
  },
  methods: {
    _fetch() {
      getSeller().then(seller => {
        this.seller = seller;
        console.log(seller);
      });
    }
  }
};
</script>

<style lang="stylus"></style>
