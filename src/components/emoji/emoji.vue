<template>
  <div id="emoji-container">
    <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div>
    <div class="waterfall" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <a href="javascript:void(0)" class="fallitem" v-for="(item) in data" :key="item">
        <img :src="CalcPath(item)"/>
      </a>
    </div>
    <!-- <div>
        <a href="" class="button blue brackets" title="">加载更多</a>
    </div> -->
  </div>
</template>

<script type="ecmascript-6">
  import {getEmojiData} from 'config/emojiData'

  export default {
    data () {
      return {
        emojis: [],
        data: [],
        busy: false,
        alreadyCount: 0
      }
    },
    created () {
      getEmojiData().then((res) => {
        this.emojis = res
      })
    },
    methods: {
        CalcPath (url) {
            if(process.env.NODE_ENV !== 'production')            
                return './static/emoji/' + url
            else
                return '/static/emoji/' + url
        },
        loadMore () {
            if(this.alreadyCount > this.emojis.length)
                return
            this.busy = true;
            setTimeout(() => {
                this.data = this.data.concat(this.emojis.slice(this.alreadyCount, this.alreadyCount + 10))
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
  #emoji-container
    padding-bottom 15px
      
@media screen and (max-width 1366px)
  #emoji-container
    padding-bottom 10px
</style>
