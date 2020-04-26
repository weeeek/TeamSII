<template>
  <div id="recommend-container">
    <div class="video-block"  v-for="item in dataList" :key="item.type">
      <a class="video-type " :href="getUrl(item)" target="_blank">{{ item.type }}</a>
      <div class="video-list">
        <a target="_blank" :href="getVideoPlayUrl(v)" class="video-detail" v-for="v in item.list" :key="v.url">
          <div class="video-img" :class="v.size">
            <div :style="setStyle(v)"></div>
          </div>
          <h3 class="video-title text-ellipsis">{{ v.title }}</h3>
          <!-- <div class="video-info">{{ v.url }}</div> -->
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
    setStyle (v) {
      let str = `background-image:url(${v.img});`
      if (v.position) {
        str += `background-position:${v.position}`
      }
      return str
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
              background-position center center
          .contain
            div
              background-size contain !important
              background-color #ebebeb
          .video-info
            display none

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
        width 100%
        .video-detail
          flex-grow 0
          margin 10px
          .video-title
            line-height 2em
            width 240px
          .video-img
            div
              width 240px
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
      padding 10px 10px 0 10px
      margin-top 10px
      &:last-child
        margin-bottom 10px
      .video-type
        font-size 12px
        margin 5px 0 0 5px
      .video-list
        width 100%
        .video-detail
          flex-grow 0
          margin 5px
          .video-title
            line-height 2em
            font-size 12px
            width 156px
          .video-img
            div
              width 156px
              height 100px
          .video-info
            display none
</style>
