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
            <a v-if="s.score" target="_blank" :href="s.score" title="如遇“百度图片无法查看”，请先登录百度账号">曲谱</a>
            <a v-if="s.play" target="_blank" :href="s.play">演奏</a>
            <button class="btn btn-xs" @click="play(s,0)" v-if="s.src">播放</button>
            <button class="btn btn-xs" @click="selectItem(s,-1)" v-if="s.src">加入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {musicConfig} from 'api/musicData'
import {mapMutations, mapActions, mapGetters } from 'vuex'
import {playMode} from 'common/js/config'

export default {
  name: `MusicList`,
  data () {
    return {
      musiclist: musicConfig.list
    }
  },
  filters: {
    plat (p) {

    }
  },
  methods: {
    //在歌单里的，选择之，播放。不在，加入歌单，播放
    play(item, index) {
      debugger
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    //加入歌单并播放
    selectItem (item) {
      // 使用mutation，commit
      
      //this.setCurrentIndex(this.playlist.length - 1)
      //this.setPlayingState(true)
      //this.selectPlay(item)
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions({})
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
