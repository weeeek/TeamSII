<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songs" :key="song.songid">
        <div class="rank">
          <span v-text="index + 1"></span>
        </div>
        <div class="content">
          <a class="name text-ellipsis" target="_blank" :href="`https://y.qq.com/n/yqq/song/${song.songmid}.html`">{{song.songname}}</a>
          <a class="play" href="javascript:void(0)" @click="selectItem(song, index)">
            <jam-play />
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { createSong } from 'common/js/song'

  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    // mounted () {
    //   this.songs.forEach((s)=>{
    //     s = createSong(s)
    //   })
    // },
    // watch: {
    //   songs: function(newSongs, oldSongs){
    //     newSongs.forEach((s)=>{
    //       if(!s.url)
    //         console.log(s.songname+'没有url')
    //     })
    //   }
    // },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
//   @import "~common/stylus/mixin"

  .song-list
    ul
      padding 12px 0
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 32px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        a
          float left
        .name
          height 32px
          line-height 32px
          margin-right 1em
        .play
          margin 4px 0
          height 24px
        .desc
          margin-top: 4px
</style>