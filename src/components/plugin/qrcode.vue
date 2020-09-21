<template>
  <center class="qrcode" v-lazy:background-image="code">
    <div slot class="icon-logo"  v-lazy:background-image="icon"></div>
  </center>
</template>

<script>
import Center from '@/components/global/center'
export default {
  props: {
    code: String,
    icon: String
  },
  components: {
    Center
  }
}
</script>

<style lang="stylus" scoped>
.qrcode
  background-repeat no-repeat
  background-size cover
  width 100%
  height 100%
  .icon-logo
    flex-basis 35px
    background-repeat no-repeat
    background-size cover
    height 35px
    border 5px solid white
    border-radius 5px
    box-shadow 0 0 5px black

@media screen and (max-width: 1366px) {
  .icon-logo{
    display none
  }
}
</style>
