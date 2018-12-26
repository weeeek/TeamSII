<template>
  <div id="music-container">    
    <div class="music-block"  v-for="item in musiclist" :key="item.type">
      <div class="music-type">{{ item.type }}</div>
      <div class="music-list">
        <div class="music-detail" v-for="s in item.songs" :key="s.title">
            <a v-if="s.plat === 'M'" target="_blank" :href="`http://music.migu.cn/v3/music/song/${s.copyrightId}`" class="music-title">{{ s.from }} - {{ s.title }}</a>
            <a v-else-if="s.plat === 'Q'" target="_blank" :href="`https://y.qq.com/n/yqq/song/${s.copyrightId}_num.html`" class="music-title">{{ s.from }} - {{ s.title }}</a>            
            <a v-else target="_blank" :href="s.src">{{ s.from }} - {{ s.title }} &#12288; 编曲：{{ s.author }}</a>
            <div class="music-info">{{ s.from }}</div>
            <a v-if="s.score" target="_blank" :href="s.score">曲谱</a>
            <a v-if="s.play" target="_blank" :href="s.play">演奏</a>
            <button class="" @click="play(s)">播放</button>
        </div>
      </div>
    </div>
    <div class="music-play-box">
      <div class="play-box">
        <music-play :resource="currentMp3"></music-play>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {musicConfig} from 'api/musicData'
import MusicPlay from 'components/music/music-play'
export default {
  name: `MusicList`,
  components:{
    MusicPlay
  },
  filters: {
    plat (p) {
      
    }
  },
  methods: {
    play(s){
      currentMp3 = s.mp3
    }
    // getmusicImage (musicinfo) {
    //   return musicinfo.img      
    // },
    // getmusicPlayUrl (musicinfo) {
    //   switch (musicinfo.from) {
    //     case `B`:
    //       return `https://www.bilibili.com/music/av${musicinfo.av}`
    //     case `Q`:
    //       return `http://v.qq.com`
    //     case `S`:
    //       return `https://tv.sohu.com/v/`
    //     case `I`:
    //       return `https://www.iqiyi.com/${musicinfo.url}.html`
    //     default:
    //       return musicinfo.url
    //   }
    // }
  },
  data () {
    return {
      currentMp3: '',
      musiclist: musicConfig.list
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#music-container
  width: 100%
  height: 100%
  .music-block
    border: 1px solid #e5e9ef
    background: white
    border-radius: 4px
    text-align: left
    overflow: hidden
    .music-type
      font-weight: bolder
    .music-list
      display: flex
      flex-direction: column
      flex-wrap: wrap
      justify-content: flex-start
      align-content: flex-start
      width: 100%
      margin: 0 -10px
      .music-from
        text-indent: 2em
      .music-detail
        flex-grow: 0
        .music-title
          font-weight: bold
          text-align: center
          line-height: 2em
        .music-img
          div
            width: 238px
            height: 150px
        .music-info
          display: none
  .music-play-box
    position fixed
    right 0
    top 0
    height 100vh
    width 400px
    z-index 5    
    &:before
      padding 0.5em
      content "=>"
      width auto
      height auto
      position absolute
      right 100%
      top 20%
      background #000
      color #FFF
    .play-box
      width 400px
      height 100%
      background #91ccea
      filter blur(20px)

@media screen and (min-width 1366px)  
  #music-container
    .music-block
      padding 10px 20px 0 20px
      margin-top 15px
      .music-type        
        font-size: 20px
        margin: 5px 0
      .music-list
        .music-detail
          margin: 10px

@media screen and (max-width 1366px)
  #music-container
    .music-block
      padding: 5px 10px 0 10px
      margin-top: 10px
      .music-type
        font-size: 16px
        font-weight: bolder
        margin: 5px 0
      .music-list
        margin: 0 -10px
        .music-from
          text-indent: 2em
        .music-detail
          font-size: 12px
          margin: 5px 10px
          .music-img
            div
              width: 238px
              height: 150px
</style>
