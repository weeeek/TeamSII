<template>
    <div class="block">
      <div class="group">
        <p-k class="pk-group" :data="d" v-for="d in burningGroups" :key="d.group"></p-k>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {burningGroup} from 'config/burningData'
  import PK from 'components/plugin/pk2'
  

  export default {
    name: 'Burning',
    components: {
      PK
    },
    data () {
      return {
        title: '燃烧吧团魂',
        burningGroups: burningGroup
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // @import '~common/stylus/variable'
  // .team
  //   width 200px
  //   display flex
  .group
    display flex
    justify-content space-between
    .pk-group
      flex 0 0 18%
</style>
