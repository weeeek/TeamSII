<template>
  <div id="focus-container">
    <div class="block">
      <div class="search">
        <search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></search>
      </div>
    </div>
    <div class="project-wrap flex flex-wrap flex-justify-between">
      <a :class="`project-item flex-l-4 flex-m-3 flex-s-2 flex-xs-1 member${i}`" target="_blank" :href="item.url" v-for="(item, i) in focusFilter" :key="i">
        <div class="project-info" :style="`background-image:url(${item.img})`">
            <h3 class="project-title text-ellipsis">{{item.from}}<br />{{item.title}}</h3>
        </div>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getFocusData } from 'config/focusData'
import Search from 'components/plugin/search'
import { searchMixin } from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  components: {
    Search
  },
  data () {
    return {
      DataList: []
    }
  },
  mounted () {
    getFocusData().then(res => {
      // 全部数据
      this.DataList = res
    })
  },
  methods: {

  },
  computed: {
    focusFilter () {
      var query = this.query.trim().toLowerCase()
      if (!query) {
        return this.DataList
      }
      return this.DataList.filter((y) => {
        return y.title.toLowerCase().includes(query) || y.from.toLowerCase().includes(query)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/project"
  @import "~common/stylus/screen"

  #focus-container
    .project-wrap
      column-count unset
      column-gap unset
      .project-info
        height 190px
        line-height 95px
        margin-bottom 0
  @media screen and (min-width 1366px)
    #focus-container
      padding-bottom 15px
  @media screen and (max-width 1366px)
    #focus-container
      padding-bottom 10px
</style>
