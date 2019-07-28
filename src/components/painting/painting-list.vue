<template>
  <div id="painting-container">
    <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div>
    <div class="waterfall" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <a :href="getWeibo(item.weibo)" target="_blank" class="fallitem" v-for="(item) in data" :key="item.url" :title="getAuthor(item.author)">
        <img :src="item.url"/>
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
        photos: [],
        data: [],
        busy: false,
        alreadyCount: 0
      }
    },
    created () {
      getPaintingData().then((res) => {
        this.photos = res
      })
    },
    methods: {
      getAuthor (author) {
        return author ? '作者：' + author : ''
      },
      getWeibo (weibo) {
        return weibo || 'javascript:void(0)'
      },
      loadMore () {
        console.log(this.alreadyCount)
        console.log(this.photos.length)
        if(this.alreadyCount > this.photos.length)
          return
        this.busy = true;
        setTimeout(() => {
          this.data = this.data.concat(this.photos.slice(this.alreadyCount, this.alreadyCount + 10))
          this.busy = false;
          this.alreadyCount += 10
        }, 1000);
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
