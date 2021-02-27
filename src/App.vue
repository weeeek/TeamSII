<template>
  <div id="app">
    <music-player></music-player>
    <uploader v-show="uploaderShow"></uploader>
    <div class="container" :class="{'showMusicPlayer': this.playlist.length > 0}">
      <global-header></global-header>
      <tab></tab>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- <snh48-live2d v-if="showLive2d" :autoFetch="showLive2d"></snh48-live2d> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getFansData } from "config/fansData";
import { mapGetters } from 'vuex'
import GlobalHeader from 'components/global/global-header'
import Tab from 'components/tab/tab'
import MusicPlayer from 'components/music/music-play'
import Uploader from 'components/global/uploader'
// import Snh48Live2d from 'components/global/snh48-live2d'

export default {
  components: {
    GlobalHeader,
    Tab,
    MusicPlayer,
    Uploader,
    // Snh48Live2d
  },
  data () {
    return {
      innerWidth: window.innerWidth
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        console.log("浏览器视口宽度大于1400像素才有live2d")
        that.innerWidth = window.innerWidth
      })()
    }
  },
  // watch: {
  //   innerWidth (val) {
  //     this.innerWidth = val
  //   }
  // },
  computed: {
    ...mapGetters(['playlist', 'uploaderShow']),
    // showLive2d () {
    //   return process.env.NODE_ENV === 'development' && this.innerWidth > 1400
    // }
  },
  methods: {
    handleMove (liveModel) {
      /*
      liveModel.setParamFloat('PARAM_ANGLE_X', value)
      第一个参数: 为要控制的模型部件，名称与制作模型时命名的名称一致

      扩展： 所以，如果你会制作live2d模型，你就可以自己命名这些名字，导出模型文件以后在这边调用就好了。

      第二个参数: 是对应第一个参数所代表的部件的 值 。

      这个值一般是0～1，-1～1，-30～30等等，可以自己试一下。其实就是头摆动的幅度啊，眨眼啊等等。

      PARAM_ANGLE_X
      PARAM_ANGLE_Y
      PARAM_ANGLE_Z
      PARAM_EYE_L_OPEN
      PARAM_EYE_L_SMILE
      PARAM_EYE_R_OPEN
      PARAM_EYE_R_SMILE
      PARAM_EYE_BALL_X
      PARAM_EYE_BALL_Y
      PARAM_BROW_L_Y
      PARAM_BROW_R_Y
      PARAM_BROW_L_X
      PARAM_BROW_R_X
      PARAM_BROW_L_ANGLE
      PARAM_BROW_R_ANGLE
      PARAM_MOUTH_FORM
      PARAM_MOUTH_OPEN
      PARAM_CHEEK
      PARAM_BREATH
      PARAM_HAIR_FRONT
      PARAM_HAIR_SIDE
      PARAM_HAIR_BACK
      */
    }
  },
  created () {
    getFansData().then(res => {
      let code = ""
      res.map(x=>{
        code +=`\r\n${x[1]}：${x[0]}`;
      })
      console.log('神秘代码',code);
    })
  },
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import '~common/stylus/index'
  @import '~common/stylus/animation'

  #app
    width 100%
    background-image url('http://47.97.248.244/static/images/bg.jpg')
    .container
      height auto
  @media screen and (min-width 1366px)
    #app
      background-repeat no-repeat
      background-position top center
      background-size contain
      color #2c3e50
      background-color $color-bg
      .container
        width 1336px
        margin 0 auto
      .showMusicPlayer
        margin-bottom 60px
  @media screen and (max-width 1366px)
    #app
      background-repeat no-repeat
      background-position top center
      background-size contain
      color #2c3e50
      background-color $color-bg
      .container
        width 100%
        margin 0 auto
        padding 0 10px
      .showMusicPlayer
        margin-bottom 60px
</style>
