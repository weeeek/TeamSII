<template>
  <div>
    <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div>
    <div class="waterfall">
      <a :href="getWeibo(item.weibo)" target="_blank" class="fallitem" v-for="(item) in photos" :key="item.url" :title="getAuthor(item.author)">
        <img :src="item.url"/>
      </a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
  // import {formatDate} from 'common/js/date'
  import {paintingConfig} from 'config/paintingData'

  export default {
    data () {
      return {
        photos: paintingConfig.list
      }
    },
    methods: {
      getAuthor (author) {
        return author ? '作者：' + author : ''
      },
      getWeibo (weibo) {
        return weibo || 'javascript:void(0)'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/waterfall'
</style>
