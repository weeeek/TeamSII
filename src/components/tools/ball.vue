<template>
  <div class="block">
    <div class="search">
      <div class="search-box">
        <jam-search @click="urlChange" />
        <input v-model="query" class="box" placeholder="球面图片文件url" />
      </div>
    </div>
    <div class="flex">
      <div class="flex-grow">
        <Ball :bg="bg"></Ball>
      </div>
    </div>
  </div>
</template>

<script>
import Ball from "components/plugin/ball";
export default {
  data() {
    return {
      query: "",
      bg: "http://hop.ie/balls/images/world-map-one-color.png",
    };
  },
  methods: {
    urlChange() {
      this.bg = this.query;
    },
  },
  components: {
    Ball,
  },
};
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  margin-bottom 1em
  background $color-bg
  border-radius 6px
  svg
    cursor pointer
  .icon-search
    font-size 24px
    color $color-bg
  .box
    flex 1
    margin 0 5px
    line-height 18px
    background $color-bg
    color $color-black-dd
    font-size $font-size-medium
    outline 0
    &::placeholder
      color $color-text-ddd
  .icon-dismiss
    font-size 16px
    color $color-bg
</style>