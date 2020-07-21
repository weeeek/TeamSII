<template>
  <div class="waterfall">
    <router-link tag="a" class="fallitem" to="/burning">
      <img src="http://wx3.sinaimg.cn/large/a04b2a1dgy1g0sx7okl4pj20u016f7wm.jpg" alt="燃烧吧团魂"/>
      <h2>燃烧吧团魂</h2>
    </router-link>
    <a :href="item.url" target="_blank" class="fallitem" v-for="(item) in entertainments" :key="item.name" :title="item.name">
      <img v-lazy="item.img" :alt="item.name" :title="item.name"/>
      <h2>{{ item.name }}</h2>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getEntertainmentData} from 'config/entertainmentData'

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
      font-weight bold
      text-align center

@media screen and (min-width 1366px)
  .waterfall
    .fallitem
      h2
        margin-top 15px
        line-height 20px


@media screen and (max-width 1366px) and (min-width 767px)
  .waterfall
    .fallitem
      h2
        margin-top 12px
        line-height 16px
        font-size 16px

@media screen and (max-width 767px)
  .waterfall
    -moz-column-count 2
    -webkit-column-count 2
    column-count 2
    .fallitem
      h2
        margin-top 9px
        line-height 12px
        font-size 12px
</style>
