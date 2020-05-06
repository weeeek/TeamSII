<template>
  <div class="accounts">
    <a
      :href="`//weibo.com/${data.weibo}`"
      :title="`微博-${data.name}`"
      target="_blank"
      class="favicon favicon-weibo"
      v-if="data.weibo"
    ></a>
    <a
      :href="`//space.bilibili.com/${data.bilibili}`"
      :title="`B站-${data.name}`"
      target="_blank"
      class="favicon favicon-bilibili"
      v-if="data.bilibili"
    ></a>
    <a
      :href="`https://www.iesdouyin.com/share/user/${data.douyin.id}`"
      :title="`${data.name}-抖音号：${data.douyin.number}`"
      target="_blank"
      class="favicon favicon-douyin"
      v-if="data.douyin"
    ></a>
    <a
      :href="data.changba"
      :title="`唱吧-${data.name}`"
      target="_blank"
      class="favicon favicon-changba"
      v-if="data.changba"
    ></a>
    <a
      :href="data.miaopai"
      :title="`秒拍-${data.name}`"
      target="_blank"
      class="favicon favicon-miaopai"
      v-if="data.miaopai"
    ></a>
    <a
      :href="data.weibomusic"
      :title="`微博音乐-${data.name}`"
      target="_blank"
      class="favicon favicon-music-weibo"
      v-if="data.weibomusic"
    ></a>
    <a
      :href="`https://music.163.com/#/user/home?id=${data.wangyiCloud}`"
      :title="`网易云音乐-${data.name}`"
      target="_blank"
      class="favicon favicon-music-wangyi"
      v-if="data.wangyiCloud"
    ></a>
    <a
      :href="`https://www.acfun.cn/u/${data.acfun}.aspx`"
      :title="`微博音乐-${data.name}`"
      target="_blank"
      class="favicon favicon-acfun"
      v-if="data.acfun"
    ></a>
    <a
      :href="`http://kg.qq.com/node/personal?uid=${data.quanmin}`"
      :title="`全民TV-${data.name}`"
      target="_blank"
      class="favicon favicon-quanmin"
      v-if="data.quanmin"
    ></a>
  </div>
</template>

<script>
export default {
    props:{
        data: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.accounts
  margin 0 auto
  display flex
  justify-content space-around
  height 16px
  .favicon
    flex-grow 0
    flex-shrink 1
    background-repeat no-repeat
    background-position center center
    background-size cover
    width 16px
    &.disable
      filter grayscale(1)
      cursor not-allowed
      pointer-events none
    &.favicon-weibo
      background-image url('//weibo.com/favicon.ico')
    &.favicon-bilibili
      background-image url('//www.bilibili.com/favicon.ico')
    &.favicon-douyin
      background-image url('//s3.pstatp.com/ies/resource/falcon/douyin_falcon/static/image/logo/favicon_v2_7145ff0.ico')
    &.favicon-changba
      background-image url('//changba.com/favicon.ico')
    &.favicon-miaopai
      background-image url('//www.miaopai.com/favicon.ico')
    &.favicon-music-weibo
      background-image url('//image2.sina.com.cn/music/web/logo/weibo2012/logo_16.ico')
    &.favicon-acfun
      background-image url('//cdn.aixifan.com/ico/favicon.ico')
    &.favicon-quanmin
      background-image url('//kg.qq.com/favicon.ico')
    &.favicon-music-wangyi
      background-image url('//s1.music.126.net/style/favicon.ico')
</style>
