<template>    
  <div class="waterfall">     
    <router-link tag="a" class="fallitem" to="/burning">
      <img src="http://wx3.sinaimg.cn/large/a04b2a1dgy1g0sx7okl4pj20u016f7wm.jpg" alt="燃烧吧团魂"/>
      <h2>燃烧吧团魂</h2>  
    </router-link> 
    <a :href="item.url" target="_blank" class="fallitem" v-for="(item) in entertainments" :key="item.name" :title="item.name">
      <img :src="item.img" :alt="item.name"/>
      <h2>{{ item.name }}</h2>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">  
  import {getEntertainmentData} from 'config/entertainmentData'
  import PK from 'components/plugin/pk'

  export default {
    name: 'Burning',
    data () {
      return {
        entertainments: []
      }
    },
    created () {
      getEntertainmentData().then((res) => {
        this.entertainments = res
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/waterfall'
  .waterfall
    .fallitem
      img
        display block
      h2
        margin-top 15px
        line-height 20px
        font-weight bold
        text-align center
</style>
