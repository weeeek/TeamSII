<template>
  <div class="block">
    <iframe src="https://teamsii.top" id="raise"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'VideoList',
  data () {
    return {
      msg: '这里是集资页'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#raise
  width 100%
  border none
  overflow none
  height calc(100vh - 362px)
  #header
    display none
  .flat-footer
    display none
</style>
