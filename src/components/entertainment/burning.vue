<template>
    <div class="block">
      <p-k :data="burningDatas"></p-k>
    </div>
</template>

<script type="text/ecmascript-6">
  import {burningData} from 'api/burningData'
  import PK from 'components/plugin/pk'
  

  export default {
    name: 'Burning',
    components: {
      PK
    },
    data () {
      return {
        title: '燃烧吧团魂',
        burningDatas: burningData
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .team
    width 200px
    display flex
</style>
