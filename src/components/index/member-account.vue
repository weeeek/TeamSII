<template>
  <div class="accounts">
    <a
      :href="`//weibo.com/${data.weibo}`"
      :title="`微博-${data.name}`"
      target="_blank"
      class="favicon favicon-weibo"
      v-if="data.weibo"
      @click="MQSend(mqType.account, data.name + '微博')"
    ></a>
    <a
      :href="`//space.bilibili.com/${data.bilibili}`"
      :title="`B站-${data.name}`"
      target="_blank"
      class="favicon favicon-bilibili"
      v-if="data.bilibili"
      @click="MQSend(mqType.account, data.name + 'B站')"
    ></a>
    <a
      :href="`https://v.douyin.com/${data.douyin.id}`"
      :title="`${data.name}-抖音号：${data.douyin.number}`"
      target="_blank"
      class="favicon favicon-douyin"
      v-if="data.douyin"
      @click="MQSend(mqType.account, data.name + '抖音')"
    ></a>
    <a
      :href="`https://changba.com/wap/index.php?s=${data.changba}`"
      :title="`唱吧-${data.name}`"
      target="_blank"
      class="favicon favicon-changba"
      v-if="data.changba"
      @click="MQSend(mqType.account, data.name + '唱吧')"
    ></a>
    <a
      :href="data.miaopai"
      :title="`秒拍-${data.name}`"
      target="_blank"
      class="favicon favicon-miaopai"
      v-if="data.miaopai"
      @click="MQSend(mqType.account, data.name + '秒拍')"
    ></a>
    <a
      :href="data.weibomusic"
      :title="`微博音乐-${data.name}`"
      target="_blank"
      class="favicon favicon-music-weibo"
      v-if="data.weibomusic"
      @click="MQSend(mqType.account, data.name + '微博音乐')"
    ></a>
    <a
      :href="`https://music.163.com/#/user/home?id=${data.wangyiCloud}`"
      :title="`网易云音乐-${data.name}`"
      target="_blank"
      class="favicon favicon-music-wangyi"
      v-if="data.wangyiCloud"
      @click="MQSend(mqType.account, data.name + '网易云音乐')"
    ></a>
    <a
      :href="`https://www.acfun.cn/u/${data.acfun}.aspx`"
      :title="`A站-${data.name}`"
      target="_blank"
      class="favicon favicon-acfun"
      v-if="data.acfun"
      @click="MQSend(mqType.account, data.name + 'A站')"
    ></a>
    <a
      :href="`http://kg.qq.com/node/personal?uid=${data.quanmin}`"
      :title="`全民TV-${data.name}`"
      target="_blank"
      class="favicon favicon-quanmin"
      v-if="data.quanmin"
      @click="MQSend(mqType.account, data.name + '全民TV')"
    ></a>
    <a
      :href="`https://m.oasis.weibo.cn/v1/h5/share?uid=${data.lvzhou}`"
      :title="`绿洲-${data.name}`"
      target="_blank"
      class="favicon favicon-lvzhou"
      v-if="data.lvzhou"
      @click="MQSend(mqType.account, data.name + '绿洲')"
    ></a>
  </div>
</template>

<script>
import { mqMixin } from "common/js/mixin"
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mixins: [mqMixin]
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.accounts {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  height: 16px;

  .favicon {
    flex-grow: 0;
    flex-shrink: 1;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 16px;

    &.disable {
      filter: grayscale(1);
      cursor: not-allowed;
      pointer-events: none;
    }

    &.favicon-weibo {
      background-image: url('//weibo.com/favicon.ico');
    }

    &.favicon-bilibili {
      background-image: url('//www.bilibili.com/favicon.ico');
    }

    &.favicon-douyin {
      background-image: url('//s3.pstatp.com/ies/resource/falcon/douyin_falcon/static/image/logo/favicon_v2_7145ff0.ico');
    }

    &.favicon-changba {
      background-image: url('//changba.com/favicon.ico');
    }

    &.favicon-miaopai {
      background-image: url('//www.miaopai.com/favicon.ico');
    }

    &.favicon-music-weibo {
      background-image: url('//image2.sina.com.cn/music/web/logo/weibo2012/logo_16.ico');
    }

    &.favicon-acfun {
      background-image: url('//cdn.aixifan.com/ico/favicon.ico');
    }

    &.favicon-quanmin {
      background-image: url('//kg.qq.com/favicon.ico');
    }

    &.favicon-music-wangyi {
      background-image: url('//s1.music.126.net/style/favicon.ico');
    }

    &.favicon-lvzhou {
      background-image: url('//oasis.weibo.cn/static/image/logo96.png');
    }
  }
}
</style>
