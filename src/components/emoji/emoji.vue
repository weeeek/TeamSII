<template>
  <div id="emoji-container">
    <div class="block">
      <a class="button blue skew" target="_blank" href="https://weibo.com/p/10080895b3a71856d76c4435c477e4ac01e57a/super_index">#勇气重生419#</a>
      <a class="button blue skew" target="_blank" href="https://weibo.com/p/100808eaa925a8fccc2a30cfcc7079d5e4fbc1/super_index">#艾斯兔表情包#</a>
    </div>
    <div class="block">
      <div class="search">
        <search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></search>
      </div>
    </div>
    <div class="waterfall">
      <a href="javascript:void(0)" class="fallitem" v-for="(item) in emojiFilter" :key="item" @click="view(item)">
        <img v-lazy="calcPath(item)"/>
      </a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import {getEmojiData} from 'config/emojiData'
import Search from 'components/plugin/search'
import { searchMixin } from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  components: {
    Search
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    getEmojiData().then((res) => {
      this.data = res
    })
  },
  methods: {
    calcPath (url) {
      return 'http://47.97.248.244/static/emoji/' + url
    },
    view (item) {
      window.open(this.calcPath(item))
    }
  },
  computed:{
    emojiFilter () {
      var query = this.query.trim().toLowerCase()
      if (!query) {
        return this.data
      }
      return this.data.filter((fileName) => {
        return fileName.toLowerCase().includes(query)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/waterfall'
@import '~common/stylus/bonbonbutton'

@media screen and (min-width 1366px)
  #emoji-container
    padding-bottom 15px
@media screen and (max-width 1366px)
  #emoji-container
    padding-bottom 10px
</style>
