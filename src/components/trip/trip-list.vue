<template>
  <div class="block">
    <div class="search">
      <trip-search :placeholder="'搜索成员、关键字（用单英文空格分隔），使用“+”同时查询关键字'" @query="onQueryChange"></trip-search>
    </div>
    <Timeline :timeline-items="timelineItems" :message-when-no-items="messageWhenNoItems" :query="query"/>
  </div>
</template>

<script type="text/ecmascript-6">
import Timeline from 'components/plugin/timeline'
import TripSearch from 'components/plugin/search'
import {getTripData} from 'config/tripData'
import {searchMixin} from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  components: {
    Timeline,
    TripSearch
  },
  data () {
    return {
      messageWhenNoItems: '加载中...',
      timelineItems: []
    }
  },
  created () {
    getTripData().then((res) => {
      this.timelineItems = res
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search
    margin-bottom 20px
</style>
