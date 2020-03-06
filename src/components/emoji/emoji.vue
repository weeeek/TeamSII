<template>
  <div id="emoji-container">
    <!-- <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div> -->
    <div class="waterfall">
      <a href="javascript:void(0)" class="fallitem" v-for="(item) in data" :key="item">
        <img v-lazy="CalcPath(item)"/>
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
        data: []
      }
    },
    created () {
      getEmojiData().then((res) => {
        this.data = res
      })
    },
    methods: {
      CalcPath (url) {
        return 'http://47.97.248.244/static/emoji/' + url
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
