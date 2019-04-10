<template>
  <div id="recommend-container">
    <div class="video-block"  v-for="item in videolist" :key="item.type">
      <a class="video-type" :href="getUrl(item)" target="_blank">{{ item.type }}</a>
      <div class="video-list">
        <a target="_blank" :href="getVideoPlayUrl(v)" class="video-detail" v-for="v in item.list" :key="v.av">
          <div class="video-img" :class="v.size">
            <div :style="`background-image:url(${v.img});background-position:${v.position}`"></div>
          </div>
          <h3 class="video-title">{{ v.title }}</h3>
          <div class="video-info">{{ v.av }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {recommendConfig} from 'config/recommendData'
export default {
  name: `RecommendList`,
  methods: {
    getVideoImage (videoinfo) {
      return videoinfo.img
    },
    getVideoPlayUrl (videoinfo) {
      switch (videoinfo.from) {
        case `B`:
          return `https://www.bilibili.com/video/av${videoinfo.av}`
        case `Q`:
          return `https://v.qq.com/detail/s/${videoinfo.url}.html`
        case `S`:
          return `https://tv.sohu.com/v/`
        case `I`:
          return `https://www.iqiyi.com/${videoinfo.url}.html`
        default:
          return videoinfo.url
      }
    },
    getUrl(obj){
      if(obj.url)
        return obj.url
      return 'javascript:void(0)'
    }
  },
  data () {
    return {
      videolist: recommendConfig.list
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #recommend-container
    width 100%
    height 100%
    .video-block
      border 1px solid #e5e9ef
      background white
      border-radius 4px
      text-align left
      overflow hidden
      .video-type
        font-size 20px
        font-weight bolder
        margin 5px 0
      .video-list
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content flex-start
        align-content flex-start
        .video-detail
          .video-title
            font-weight bold
            text-align center
          .video-img
            div              
              background-repeat no-repeat
              background-size cover
          .contain
            div
              background-size contain !important
              background-color #ebebeb
          .video-info
            display none

@media screen and (min-width 1366px)
  #recommend-container
    .video-block
      padding 10px 20px 0 20px
      margin-top 15px
      .video-type
        font-size 20px
        margin 5px 0
      .video-list
        width 100%
        margin 0 -10px
        .video-detail
          flex-grow 0
          margin 10px
          .video-title
            line-height 2em
          .video-img
            div
              width 238px
              height 150px              
          .contain
            div
              background-size contain !important
              background-color #ebebeb
          .video-info
            display none

@media screen and (max-width 1366px)
  #recommend-container
    .video-block
      padding 5px 10px 0 10px
      margin-top 10px
      .video-type
        font-size 12px
        margin 5px 0
      .video-list
        width 100%
        margin 0 -5px
        .video-detail
          flex-grow 0
          margin 5px
          .video-title
            line-height 2em
            font-size 12px
          .video-img
            div
              width 169px
              height 107px
          .video-info
            display none            
</style>
