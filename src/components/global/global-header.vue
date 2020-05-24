<template>
  <div class="global-header">
    <keep-alive>
      <router-link tag="div" class="logo" to="/"></router-link>
    </keep-alive>
    <div class="header-container">
      <div class="header-control">
        <h1 class="title">{{ title }}</h1>
        <a href="https://weibo.com/p/100808ece29cf744f4d14b450f0c12999e767b/super_index" target="_blank" class="button blue oval icon" title="微博：SNH48 Team SII 超级话题">微博超级话题</a>
        <!-- <button class="button green skew" title="功能完善中...">签到</button> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'GlobalHeader',
    data () {
      return {
        title: 'SNH48 Team SII 资源中心'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/bonbonbutton'

  .global-header
    position relative
    .header-container
      position absolute
      background-color white
      .header-control
        h1
          font-weight bolder
    .logo
      position absolute
      background-image url('http://47.97.248.244/static/images/flag.jpg')
  @media screen and (min-width 1366px)
    .global-header
      height 220px
      .header-container
        height 110px
        bottom 0
        left 0
        z-index 1
        width 100%
        .header-control
          width calc(100% - 220px)
          margin-left 220px
          padding 10px 10px 10px 0
          h1
            font-size 32px
        .title
            width 100%
      .logo
        left 20px
        bottom 20px
        z-index 2
        width 180px
        height 180px
        border 3px solid #FFF
        box-shadow 0 2px 4px rgba(0,0,0,0.3)
        cursor pointer
  @media screen and (max-width 1366px)
    .global-header
      height 110px
      .header-container
        height 65px
        bottom 0
        left 0
        z-index 1
        width 100%
        .header-control
          width calc(100% - 110px)
          margin-left 110px
          padding 5px 5px 5px 0
          h1
            margin 4px 0
            font-size 16px
          a
            margin 0
            padding 0 0.3em
            line-height 25px
          button
            font-size 12px
            line-height 12px
            height 18px
        .title
            width 100%
      .logo
        left 10px
        bottom 10px
        z-index 2
        background-size cover
        width 90px
        height 90px
        border 3px solid #FFF
        box-shadow 0 2px 4px rgba(0,0,0,0.3)
        cursor pointer
</style>
