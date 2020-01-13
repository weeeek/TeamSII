<template>
  <div id="music-container" :class="{'hasPlayer': this.playlist.length > 0}">
    <div class="music-block" v-for="item in qqMusicList" :key="item.typeName">
      <div class="music-type">{{ item.typeName }}</div>
      <div class="music-group" v-for="g in item.group" :key="g.title">
        <div class="music-group-title">{{ g.title }}</div>
        <div class="music-list">
          <song-list :songs="g.songs" @select="selectSong"></song-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMusicData } from 'config/musicData'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import SongList from 'components/music/song-list'
import { createSong } from 'common/js/song'

export default {
  name: `MusicList`,
  components: {
    SongList
  },
  data () {
    return {
      qqMusicList: []
    }
  },
  created () {
    getMusicData().then((res) => {
      this.qqMusicList = this._normalizaSongs(res)
    })
  },
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  methods: {
    _normalizaSongs (list) {
      let ret = []
      list.map((l, xIndex) => {
        ret.push({
          typeName: l.typeName,
          group: []
        })
        l.group.map((g, yIndex) => {
          ret[xIndex].group.push({
            title: g.title,
            songs: []
          })
          g.songs.map((s) => {
            let song = createSong(s)
            ret[xIndex].group[yIndex].songs.push(song)
          })
        })
      })
      return ret
    },
    selectSong (song) {
      this.insertSong(song)
    },
    // 在歌单里的，选择之，播放。不在，加入歌单，播放
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions(['insertSong'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#music-container
  &.hasPlayer
    margin-bottom 60px
  width: 100%
  height: 100%
  .music-block
    border: 1px solid #e5e9ef
    background: white
    border-radius: 4px
    text-align: left
    overflow: hidden
    .music-group
      margin 15px 0
      padding-left 2em
      .music-group-title
        font-weight: bolder
        font-size 20px
    .music-type
      font-weight: bolder
    .music-list
      padding-left 2em
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
        .music-img
          div
            width: 238px
            height: 150px
        .music-info
          display: none
@media screen and (min-width 1366px)
  #music-container
    .music-block
      padding 10px 20px
      margin-top 15px
      &:last-child
        margin-bottom 15px
      .music-type
        font-size: 20px
        margin: 5px 0
      .music-list
        &:after
          content " "
          clear both
        .music-detail
          height 24px
          line-height 24px
          margin 4px 10px
          a
            float left
            height 24px
            line-height 24px
            margin 6px 0

@media screen and (max-width 1366px)
  #music-container
    .music-block
      padding: 5px 10px 0 10px
      margin-top: 10px
      &:last-child
        margin-bottom 10px
      .music-type
        font-size: 16px
        margin: 5px 0
      .music-list
        margin: 0 -10px
        &:after
          content " "
          clear both
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
