<template>
  <div id="recommend-container">
    <div class="video-block" v-for="item in dataList" :key="item.type">
      <a class="video-type " :href="getUrl(item)" target="_blank">{{ item.type }}</a>
      <div class="video-list flex flex-wrap flex-justify-between">
        <a class="video-detail flex-l-4 flex-m-3 flex-s-2 flex-xs-1" target="_blank" :href="getVideoPlayUrl(v)" v-for="(v, i) in item.list" :key="i">
          <img v-lazy="v.img" :style="getStyle(v)" />
          <h3 class="video-title text-ellipsis">{{ v.title }}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommendData} from 'config/recommendData'
export default {
  name: `RecommendList`,
  created () {
    getRecommendData().then((res) => {
      this.dataList = res
    })
  },
  methods: {
    getStyle (v) {
      if (v.fit) {
        return `object-fit: ${v.fit};object-position: ${v.position}`
      }
    },
    getVideoImage (videoinfo) {
      return videoinfo.img
    },
    getVideoPlayUrl (videoinfo) {
      switch (videoinfo.from) {
        case `BV`:
          return `https://www.bilibili.com/video/BV${videoinfo.url}`
        case `B`:
          return `https://www.bilibili.com/video/av${videoinfo.url}`
        case `Q`:
          return `https://v.qq.com/detail/s/${videoinfo.url}.html`
        case `S`:
          return `https://tv.sohu.com/v/`
        case `I`:
          return `https://www.iqiyi.com/${videoinfo.url}.html`
        case `W`:
          return `https://weibo.com/p/${videoinfo.url}`
        default:
          return videoinfo.url
      }
    },
    getUrl (obj) {
      if (obj.url) {
        return obj.url
      }
      return 'javascript:void(0)'
    }
  },
  data () {
    return {
      dataList: []
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/screen"

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
      .video-list
        width 100%
        .video-detail
          img
            width 100%
            height 183px
            box-shadow 5px 5px 5px rgba(0, 0, 0, 0.75)
          .video-title
            line-height 2em
            font-weight bold
            text-align center

@media screen and (min-width 1366px)
  #recommend-container
    .video-block
      &:last-child
        margin-bottom 15px
      padding 15px 15px 0 15px
      margin-top 15px
      .video-type
        font-size 20px
        margin 5px 0 0 10px
      .video-list
        .video-detail
          padding 10px

@media screen and (max-width 1366px)
  #recommend-container
    .video-block
      padding 10px 10px 0 10px
      margin-top 10px
      &:last-child
        margin-bottom 10px
      .video-type
        margin 5px 0 0 5px
      .video-list
        .video-detail
          padding 5px
</style>
