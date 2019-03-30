<template>
  <div class="block">
    <div class="search">
      <trip-search :placeholder="'搜索成员、关键字（用单英文空格分隔）'" @query="onQueryChange"></trip-search>
    </div>
    <Timeline :timeline-items="timelineItems" :message-when-no-items="messageWhenNoItems" :query="query"/>
  </div>
</template>

<script type="text/ecmascript-6">
import Timeline from 'components/plugin/timeline'
import TripSearch from 'components/trip/trip-search'
import {tripData} from 'config/tripData'
import {searchMixin} from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  components: {
    Timeline,
    TripSearch
  },
  data () {
    return {
      query: '',
      messageWhenNoItems: 'There are not any items',
      timelineItems: tripData
    }
  },
  watch: {
    
  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search
    margin-bottom 20px
</style>
