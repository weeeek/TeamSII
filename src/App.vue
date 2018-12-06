<template>
  <div id="app">
    <div class="container">
      <global-header></global-header>
      <tab></tab>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import GlobalHeader from 'components/global/global-header'
import Tab from 'components/tab/tab'

export default {
  components: {
    GlobalHeader,
    Tab
  },
  name: 'App'
}
</script>
<style lang="stylus" rel="stylesheet/stylus" >
@import '~common/stylus/index'
  
@media screen and (min-width 1366px)  
  #app
    height 100%
    background-image url('/TeamSII/dist/static/images/bg.jpg')
    background-repeat no-repeat
    background-position top center
    background-size contain
    color #2c3e50
    padding 15px 0
    background-color $color-bg
    .container
      width 1336px
      margin 0 auto

@media screen and (max-width 1366px)
  #app
    height 100%
    background-image url('/TeamSII/dist/static/images/bg.jpg')
    background-repeat no-repeat
    background-position top center
    background-size contain
    color #2c3e50
    padding 15px 0
    background-color $color-bg
    .container
      width 100%
      margin 0 auto
      padding 0 10px
</style>
