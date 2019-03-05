<template>
  <div id="app">
    <music-player></music-player>
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
import { mapGetters } from "vuex";
import GlobalHeader from 'components/global/global-header'
import Tab from 'components/tab/tab'
import MusicPlayer from 'components/music/music-play'

export default {
  components: {
    GlobalHeader,
    Tab,
    MusicPlayer
  },
  computed: {
      ...mapGetters(['playlist'])
  },
  data () {
    return {
      musicBoxShow: false,
      currentMp3: '',
    }
  },
  created () {
    console.log('神秘代码了解一下～\r\n130594899 陈观慧\r\n150874160 陈思\r\n662933178 戴萌\r\n284331448 蒋芸\r\n221771881 孔肖吟\r\n208081470 李宇琪\r\n460370278 刘增艳\r\n511716523 吕一\r\n290102632 莫寒\r\n277655492 钱蓓婷\r\n306979367 邱欣怡\r\n390766661 邵雪聪\r\n236647306 孙芮\r\n180764582 温晶婕\r\n275742112 吴哲晗\r\n219365999 徐晨辰\r\n121545472 许佳琪\r\n383411206 徐伊人\r\n200264670 徐子轩\r\n316835439 袁丹妮\r\n327766791 袁雨桢\r\n132204035 张语格\r\n364510713 赵晔\r\n471109965 成珏\r\n579439188 潘燕琦\r\n101724227 冯晓菲\r\n732027510 陈俊羽\r\n31428401  杨令仪\r\n728999183 朱小丹\r\n609941641 SNH48-Team SII 应援会2群')
    console.log('%cSNH48 Team SII 应援会程序组，期待大佬的加入', 'padding:1em 2em; background-color:#000; color:#FFF; text-shadow: #FFF 0px 0px 5px, #FFF 0px 0px 10px, rgb(145,205,235) 0px 0px 15px, rgb(145,205,235) 0px 0px 20px, rgb(145,205,235) 0px 0px 25px, rgb(145,205,235) 0px 0px 30px, rgb(145,205,235) 0px 0px 35px; font-size:2em')
  },
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import '~common/stylus/index'
  @import '~common/stylus/animation'

  #app
    margin-right calc(100% - 100vw)
    width 100%
    background-image url('common/image/bg.jpg')
    .container
      height 100%
  @media screen and (min-width 1366px)
    #app
      height 100%      
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
