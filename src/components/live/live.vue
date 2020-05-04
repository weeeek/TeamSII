<template>
  <div class="block">
    <button @click="selectVideo"></button>
    <video id="my-player"
               class="video-js vjs-default-skin vjs-big-play-centered"
                 preload="auto"
                 autoplay
                 style="width: 100%;height: 100%;"
                 controls
                 data-setup='{}'>
            <source type="rtmp/flv">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
videojs.options.flash.swf = SWF_URL // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件

export default {
  name: 'videojs',
  data () {
    return {
      videoPlayer: undefined,
      videoSrc: ''
    }
  },
  mounted () {
    this.selectVideo()
  },
  methods: {
    // 选择摄像头时的触发事件，可以根据摄像头信息获取对应的直播流地址后对videoSrc进行赋值
    selectVideo () {
      this.videoSrc = 'rtmp://liveplaylk.lvb.eastmoney.com/live/2519_3830846?txSecret=ca1b343a2025dc2fd6dc918e746beea6&txTime=5EAEBC44&txPlayNoDelay=true'
      const videoPlayer = videojs('my-player') // 关联video标签的id
      videoPlayer.src({
        src: this.videoSrc,
        type: 'rtmp/flv'
      }, () => { videoPlayer.play() })
    }
  }
}
</script>

<style scoped>
.video-js .vjs-big-play-button{
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
}
/* 点击屏幕播放/暂停 */
.video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
}
</style>
