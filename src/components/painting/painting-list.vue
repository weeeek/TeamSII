<template>
  <div id="painting-container">
    <!-- <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div> -->
    <div class="waterfall">
      <a class="fallitem" v-for="(item) in data" :key="item.url" :title="getAuthor(item.author)" @click="view(item)">
        <img v-lazy="item.url"/>
      </a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
  // import {formatDate} from 'common/js/date'
  import {getPaintingData} from 'config/paintingData'

  export default {
    data () {
      return {
        data: []
      }
    },
    created () {
      getPaintingData().then((res) => {
        this.data = res
      })
    },
    methods: {
      getAuthor (author) {
        return author ? '作者：' + author : ''
      },
      getWeibo (weibo) {
        return weibo || 'javascript:void(0)'
      },
      view (item) {
        window.open(item.url)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/waterfall'

@media screen and (min-width 1366px)
  #painting-container
    padding-bottom 15px

@media screen and (max-width 1366px)
  #painting-container
    padding-bottom 10px
</style>
