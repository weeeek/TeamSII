<template>
  <!-- 遮罩层 -->
  <div class="img-layer flex flex-column" v-show="imgSrc" @click="imgSrc = ''">
    <div class="flex-grow"></div>
    <div class="img-row flex">
      <div class="flex-grow"></div>
      <a class="img-block" @click="download()">
        <img :src="imgSrc" />
      </a>
      <div class="flex-grow"></div>
    </div>
    <div class="flex-grow"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgSrc: ''
    }
  },
  methods: {
    download () {
      window.open(this.imgSrc)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
/*动画*/
.fade-enter-active,
.fade-leave-active
  .img-layer
    transition all 0.3s linear
    transform scale(1)

.fade-enter,
.fade-leave-active
  .img-layer
    transform scale(0)

/* bigimg */

.img-layer
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  z-index 100000
  background rgba(0, 0, 0, 0.7)
  overflow hidden
  .img-row
    .img-block
      position relative
      cursor pointer
      img
        max-width 90vw
        max-height 90vh
      .btn-download
        position absolute
        right -12px
        top -12px
        border-radius 50%
        border 2px solid white
</style>
