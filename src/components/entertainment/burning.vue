<template>
    <div class="block">
      <div class="block" style="text-align: center">
        <a target="_blank" href="https://www.bilibili.com/video/av57291688">
          <img src="http://wx2.sinaimg.cn/large/6f4898e1gy1g40q1qejzqj20u016f7wh.jpg" style="object-fit: contain"/>
        </a>
      </div>
      <div class="group">
        <p-k class="pk-group" :data="d" v-for="d in burningGroups" :key="d.group"></p-k>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {getBurningData} from 'config/burningData'
  import PK from 'components/plugin/pk2'

  export default {
    name: 'Burning',
    components: {
      PK
    },
    created () {
      getBurningData().then((res) => {
        this.burningGroups = res
      })
    },
    data () {
      return {
        title: '燃烧吧团魂',
        burningGroups: []
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
