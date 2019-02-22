<template>
  <iframe class="block" src="https://weeeek.github.io/EmojiFight/index.html" />
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'EmojiFight',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
iframe
  margin-bottom 0
  width 100%
@media screen and (min-width 1366px)
  iframe
    height calc(100% - 275px)
@media screen and (max-width 1366px)
  iframe
    height calc(100% - 137px)
</style>
