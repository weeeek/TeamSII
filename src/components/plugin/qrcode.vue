<template>
  <div class="block">
    <div class="qrcode" :style="{'background-image': `url('${code}')`}">
      <div class="icon-logo" :style="{'background-image': `url('${icon}')`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: String,
    icon: String
  }
}
</script>

<style lang="stylus" scoped>
.qrcode
  background-repeat no-repeat
  background-size cover
  width 235px
  height 235px
  position relative
  .icon-logo
    position absolute
    background-repeat no-repeat
    background-size cover
    width 35px
    height 35px
    left 100px
    top 100px
    border-radius 5px
    box-shadow 0 0 2px black
</style>
