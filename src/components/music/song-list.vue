<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songs" :key="song.id">
        <div class="rank">
          <span v-text="index + 1"></span>
        </div>
        <div class="content">
          <a class="name text-ellipsis" target="_blank" :href="`https://y.qq.com/n/yqq/song/${song.mid}.html`">{{song.name}}</a>
          <a class="icon" href="javascript:void(0)" @click="selectItem(song, index)">
            <jam-play :fillColor="'#87cefa'" />
          </a>
          <a class="icon" :href="p.url" v-for="p in song.play" target="_blank" :title="`${p.player}-${getTypeString(p.type)}演奏`" :key="p.url">            
            <span :class="p.type"></span>
          </a>
          <a class="icon" :href="song.opern" v-if="song.opern" target="_blank" :title="`${song.name}-曲谱`">
            <jam-music-f :fillColor="'#87cefa'" />
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      getTypeString (str) {
        switch (str) {
          case 'piano':
            return '钢琴'
          case 'guita':
            return '吉他'
          case 'violin':
            return '小提琴'
          case 'erhu':
            return '二胡'
          case 'note':
            return '曲谱'
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .piano
    margin-right 5px
    margin-bottom -1px
    width 1.5em
    height 1.25em
    vertical-align bottom
    background white
    border 2px solid $color-team-sii
    position relative
    display inline-block
    &:before, &:after
      content ' '
      display block
      position absolute
      top 0
      width 0.3em
      height 0.7em
      background #000
    &:before
      left 15%
    &:after
      left 60%
  .note
    display inline-block
    width 1em
    height 1.5em
    border-color transparent $color-team-sii transparent transparent
    border-style none solid none none
    border-width 0 2px 0 0
    position relative
    &:before
      content ''
      width 0.8em
      height 0.35em
      bottom 0
      left 0.55em
      background $color-team-sii
      border-radius 0.05em
      transform rotate(-15deg)      
  .erhu
    display inline-block
    width 1em
    height 1.5em
    border-top-right-radius 3px
    border-color transparent $color-team-sii transparent transparent
    border-style none solid none none
    border-width 0 2px 0 0
    box-shadow 1px 0 0 #000
    position relative
    left -0.5em
    &:before
      content ''
      position absolute
      width 0.8em
      height 0.35em
      bottom 0
      left 0.55em
      background $color-team-sii
    &:after
      content ''
      position absolute
      width 0.6em
      height 0.1em
      top 0.35em
      left 0.65em
      border-color #000 transparent
      border-style solid none
      border-width 1px 0
  .violin
    margin-right 5px
    display inline-block
    border-radius 2em
    border-color $color-team-sii $color-team-sii transparent $color-team-sii
    border-style solid solid none solid
    border-width .45em .45em 0 .45em
    position relative
    height 0.9em 
    width 1em
    &:before
      content ''
      display block
      position absolute
      bottom -6px
      left calc(0% - 0.55em)
      width .3em
      height .5em
      border-radius 2em
      border-color transparent $color-team-sii $color-team-sii $color-team-sii
      border-style none solid solid solid
      border-width 0 .45em .45em .45em
    &:after
      content ''
      background $color-team-sii
      width 1px
      height 18px
      border-color transparent #000
      border-style none solid
      border-width 0 1px
      position absolute
      top -1em
      left -.5px
  .bilibili
    height 100% 
    width 2em
    display inline-block
    background-image url('//www.bilibili.com/favicon.ico')
    background-size contain
    background-position center center
    background-repeat no-repeat

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
        .icon
          margin 4px 0
          height 24px
        .desc
          margin-top: 4px
</style>