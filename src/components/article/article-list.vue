<template>
  <div>
    <div class="block">欢迎投稿，投稿请<a class="link" href="https://weibo.com/u/5266139275">@SNH48 TeamSII应援会</a>，或者发布于<a class="link" target="_blank" href="https://weibo.com/p/100808ece29cf744f4d14b450f0c12999e767b/super_index">“SNH48 TeamSII”超级话题</a></div>
    <div class="block">
      <v-collapse-wrapper  v-for="a in articleDatas" :key="a.name">
        <div class="header" v-collapse-toggle>
            <span :class="{'member':a.member}">{{ a.name }}</span>
            <a target="_blank" :href="a.author.link" :class="{'member':a.member}">{{ a.author.name }}</a>
        </div>
        <div class="content" v-collapse-content>
          <ol>
            <li v-for="item in a.articles" :key="item.chapter">
              <a target="_blank" :href="item.url">{{ item.title }}</a>
            </li>
            <li v-if="!a.finish">未完待续...</li>
          </ol>
        </div>
      </v-collapse-wrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {articleDatas} from 'api/articleData'

export default {
  name: 'VideoList',
  data () {
    return {
      articleDatas: articleDatas
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-collapse-toggler
  padding 15px
  color #333
  background-color #f5f5f5
  border 1px solid #ddd
  color #fa7d3c
  cursor pointer
  span    
    font-weight bolder
  .member
    color #87cefa
  a
    font-weight bolder
    color #fa7d3c
    float right
    &.member
      color #87cefa

.v-collapse-content
  padding calc(2em - 26px) 15px
  border-top 0 solid #ddd
  border-bottom 1px solid #ddd
  border-left 1px solid #ddd
  border-right 1px solid #ddd
  display none
  transition all .6s
  line-height 2em

.v-collapse-content-end
  display block
</style>
