<template>
  <div>
    <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a></div>
    <div class="waterfall">
      <a href="javascript:void(0)" class="fallitem" v-for="(item) in emojis" :key="item">
        <img :src="CalcPath(item)"/>
      </a>   
    </div>
  </div>
</template>

<script type="ecmascript-6">
  import {emojiConfig} from 'config/emojiData'

  export default {
    data () {
      return {
        emojis: emojiConfig.list
      }
    },
    methods: {
        CalcPath (url) {
            if(process.env.NODE_ENV !== 'production')            
                return './static/emoji/' + url
            else
                return '/TeamSII/dist/static/emoji/' + url
        }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/waterfall'
</style>
