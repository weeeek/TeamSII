<template>
  <div class="block">
    <div class="video-block">
      <div class="video-category">
        <a class="active">
          全部<span class="count">{{total}}</span>
        </a>
        <a class="" v-for="t in categories" :key="t.tid">
          {{t.name}}<span class="count">{{t.count}}</span>
        </a>
      </div>
      <div class="video-list">
        <a target="_blank" :href="getVideoPlayUrl(v.aid)" class="video-detail" v-for="v in videolist" :key="v.aid">
          <div class="img-content" :style="`background-image:url(http:${v.pic})`"></div>
          <div class="video-date">{{ v.created * 1000 | formatDate }}</div>
          <div class="video-title">{{ getVideoTitle(v.title) }}</div>
        </a>
      </div>
    </div>
    <div class="block">
      <pagination :total="total" :current-page='current' @pagechange="pagechange"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getVideo} from 'api/video'
import {formatDate} from 'common/js/date'
import Pagination from 'components/plugin/pagination'
export default {
  name: `VideoList`,
  components: {
    Pagination
  },
  data () {
    return {
      total: 0, // 记录总条数
      display: this.$route.display ? this.$route.display : 30, // 每页显示条数
      current: this.$route.page ? this.$route.page : 1, // 当前的页数
      videolist: [],
      categories: []
    }
  },
  methods: {
    getVideoTitle (title) {
      return title.replace('【SNH48】', '')
    },
    getVideoPlayUrl (url) {
      return `https://www.bilibili.com/video/av${url}`
    },
    initVideoList (resonse) {
      console.log(resonse)
      if (!resonse.query.count !== 0 && resonse.query.results.json.data) {
        let data = resonse.query.results.json.data
        this.total = Number(data.count)
        this.videolist = data.vlist
        this.categories = []
        data.tlist._.map((t) => {
          this.categories.push(t)
        })
        this.categories.push(data.tlist._19)
        this.categories.push(data.tlist._29)
        this.categories.push(data.tlist._60)
        this.categories.push(data.tlist._65)
      }
    },
    pagechange (currentPage) {
      console.log(currentPage)
      getVideo(this.initVideoList, currentPage, this.display)
    }
  },
  created () {
    // console.log(this.current)
    // console.log(this.display)
    // console.log(this.$route.page)
    // console.log(this.$route.display)
    getVideo(this.initVideoList, this.current, this.display)
  },
  filters: {
    formatDate (time) {
      return formatDate(new Date(time), 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.video-block
  width: 100%
  .video-category
    background: #edf2f9
    border-radius: 4px
    line-height: 36px
    padding: 0 20px
    a
      margin-right: 30px
    .active
      color: #00a1d6
    .count
      color: #aaaaaa
      margin-left: 8px
  .video-list
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between
    align-content: flex-start
    width: 100%
    .video-detail
      flex-grow: 0
      flex-shrink: 0
      flex-basis: 240px
      margin: 10px 0
      .img-content
        width: 240px
        height: 150px
      .video-title
        font-size: 14px
        font-weight: bold
        text-align: left
        display: block
        line-height: 20px
        height: 44px
        overflow: hidden
      .video-date
        margin-top: 6px
        text-align: left
</style>
