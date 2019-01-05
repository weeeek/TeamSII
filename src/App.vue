<template>
  <div id="app">
    <div class="music-play-box" :class="{'musicBoxShow':musicBoxShow}">
      <a class="switch" href="javascript:void(0)" @click="musicBoxShow=!musicBoxShow" v-if="sequenceList.length > 0">
        <jam-arrow-square-right v-if="musicBoxShow"/>
        <jam-arrow-square-left v-if="!musicBoxShow"/>
      </a>       
      <player></player>
    </div>
    <!-- <player></player> -->
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
import Player from 'components/music/music-play'
// import Player from 'components/music/Music-Player/player/player'
// import MusicApp from 'components/music/Music-Player/MusicApp'

export default {
  components: {
    GlobalHeader,
    Tab,
    //MusicApp
    Player
  },
  computed: {
      ...mapGetters(['sequenceList'])
  },
  data () {
    return {
      musicBoxShow: false,
      currentMp3: '',
    }
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
    .music-play-box
      position fixed
      right -400px
      top 290px
      height calc(100% - 290px)
      width 400px
      z-index 5
      transition all .6s ease-in-out
      background $color-team-sii
      &.musicBoxShow
        right 0
      a.switch
        padding 0.5em
        width auto
        height auto
        position absolute
        right 100%
        top calc(50% - 1em)

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
