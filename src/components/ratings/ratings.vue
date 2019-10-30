<template>
  <div class="ratings">ratings组件</div>
</template>

<script>
import { getRatings } from "api";
export default {
  name: "ratings",
  props: {},
  data() {
    return {
      ratings: {}
    };
  },
  methods: {
    _fetch() {
      // 当点击对应组件时才请求，调取数据
      getRatings().then(ratings => {
        this.ratings = ratings;
        console.log(ratings);
      });
    }
  }
};
</script>

<style lang="stylus"></style>
