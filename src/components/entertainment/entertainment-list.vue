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
  import {entertainmentConfig} from 'config/entertainmentData'
  import PK from 'components/plugin/pk'

  export default {
    name: 'Burning',
    data () {
      return {
        entertainments: entertainmentConfig.list
      }
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
  @media screen and (min-width 1366px)
    .waterfall
        -moz-column-count 3
        -webkit-column-count 3
        column-count 3
  @media screen and (max-width 560px)
    .waterfall
      -moz-column-count 1
      -webkit-column-count 1
      column-count 1
</style>
