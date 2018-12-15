<template>
  <div id="dynamic-container">
    <div class="dynamic" v-for="(card, index) in dynamicCards" :key="index">
      <a class="block-av" v-if="card.type === 'av'" :href="`https://www.bilibili.com/video/av${card.aid}`" target="_blank">
        <div class="img" :style="`background-image:url(${card.pic})`"></div>
        <div class="av-info">
          <div class="dynamic-title">{{ card.title }}</div>
          <div class="av-stat">
            <div class="bp-icon-font icon-play-a">{{ card.stat.view }}</div>
            <div class="bp-icon-font icon-danmu-a">{{ card.stat.danmaku }}</div>
            <div class="bp-svg-icon single-icon comment">{{ card.stat.reply }}</div>
            <br />
            <div class="bp-svg-icon single-icon zan">{{ card.stat.like }}</div>
            <div class="bp-svg-icon single-icon star-empty">收藏：{{ card.stat.favorite }}</div>
            <div class="bp-svg-icon single-icon transmit">转发：{{ card.stat.share }}</div>
          </div>
        </div>
        <div class="dynamic-date">{{ card.pubdate * 1000 | formatDate }}</div>
      </a>
      <a class="dynamic block-h" v-if="card.type === 'h'" :href="`https://h.bilibili.com/${card.item.id}`" target="_blank">
        <article v-html="translate(card.item.description)"></article>
        <div class="img-content-sm" :style="`background-image:url(${picture.img_src})`" v-for="(picture, pindex) in card.item.pictures" :key="pindex"></div>
      </a>
      <a class="dynamic block-o" v-if="card.type === 'o'" :href="`https://t.bilibili.com/`"></a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
  import {getDynamic} from 'api/dynamic'
  import {formatDate} from 'common/js/date'
  import {emojiTranslate} from 'common/js/emoji-translate'

  export default {
    data () {
      return {
        dynamicCards: []
      }
    },
    created () {
      getDynamic(this.getDynamicCallBack)
    },
    methods: {
      getDynamicCallBack (data) {
        if (!data.query.count !== 0 && data.query.results.json.code === '0') {
          let jsonResult = data.query.results.json.data.cards.map((c) => {
            let card = JSON.parse(c.card)
            if (card.aid) {
              return Object.assign({type: 'av'}, card)
            } else if (card.origin) {
              card.origin = JSON.parse(card.origin)
              return Object.assign({type: 'o'}, card)
            } else {
              return Object.assign({type: 'h'}, card)
            }
          })
          //console.log('json', jsonResult)
          this.dynamicCards = jsonResult
        } else {
          //console.log('errorCode', data.query.results.json.code)
        }
      },
      translate (str) {
        return emojiTranslate(str)
      }
    },
    filters: {
      formatDate (time) {
        return formatDate(new Date(time), 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@media screen and (min-width 1366px)
  #dynamic-container
    width 100%
    height 100%
    .dynamic
      margin-top 15px
    .block-o
      display none
    .block-av
      display -webkit-flex
      display flex
      height 170px
    .block-h
      display block
      article
        line-height 30px
        word-break break-all
        margin-bottom 10px
    .block-av, .block-h
      border 1px solid #e5e9ef
      background white
      border-radius 4px
      text-align left
      overflow hidden
      padding 20px
      .dynamic-date
        flex-basis 90px
        height 130px
        flex-shrink 0
      .dynamic-title
        font-size 16px
        line-height 30px
        vertical-align text-top
        font-weight bolder
        margin-bottom 15px
        &:hover
          color $color-team-sii
      .img
        flex-basis 231px
        height 130px
        background-position center center
        background-repeat no-repeat
        background-size cover
        flex-shrink 0
      .av-info
        padding 0 15px
        height 130px
        flex-grow 1
      .av-stat
        div
          display inline

@media screen and (max-width 1366px)
  #dynamic-container
    width 100%
    height 100%
    .dynamic
      margin-top 10px
    .block-o
      display none
    .block-av
      display -webkit-flex
      display flex
      flex-direction column
    .block-h
      display block
      article
        line-height 20px
        word-break break-all
        margin-bottom 10px
    .block-av, .block-h
      border 1px solid #e5e9ef
      background white
      border-radius 4px
      text-align left
      overflow hidden
      padding 10px
      .dynamic-date
        flex-shrink 0
        font-size 10px
      .dynamic-title
        font-size 12px
        line-height 20px
        vertical-align text-top
        font-weight bolder
        margin-bottom 5px
        &:hover
          color $color-team-sii
      .img
        flex-basis 231px
        height 130px
        background-position center center
        background-repeat no-repeat
        background-size cover
        flex-shrink 0
      .av-info
        flex-grow 1
      .av-stat
        display none
</style>
