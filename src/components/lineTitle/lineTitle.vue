<template>
  <div class="title">
    <div class="line"></div>
    <h1 class="text">{{title}}</h1>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "line-title",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="stylus" scoped>
.title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;

  .line {
    flex: 1; // 这里对我有点不动,神奇啊
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .text {
    padding: 0 12px;
    font-weight: 700;
    font-size: $fontsize-medium;
  }
}
</style>
