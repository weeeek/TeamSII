<template>
  <div id="dplayer"></div>
</template>

<script>
// http://dplayer.js.org/zh/guide.html#%E5%8F%82%E6%95%B0
import DPlayer from "dplayer";
import { getVideoData } from "config/videoData";
export default {
  name: "VideoPlay",
  data() {
    return {
      dp: {},
    };
  },
  mounted() {
    // 解析传进来的videoId，过后台，拿到配置，生成播放器
    getVideoData(this.$route.params.id).then((json) => {
      var options = JSON.parse(json);
      options.forEach((x) => {
        Object.assign(x, {
          container: document.getElementById("dplayer"),
          autoplay: false,
          theme: "#FADFA3",
          loop: false,
          lang: "zh-cn",
          screenshot: false, // 如果开启截图，视频和视频封面需要允许跨域
          hotkey: true, // 开启热键，支持快进快退音量控制播放暂停
          airplay: true, // 在 Safari 中开启 AirPlay
          preload: "auto",
          logo: "logo.png",
          volume: 0.7,
          mutex: true, // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
          contextmenu: [
            // 	自定义右键菜单
            {
              text: "视频地址",
              link: x.video.url
            },
            {
              text: "播放器github",
              link: "https://github.com/DIYgod/DPlayer",
            },
          ],
        });
        this.dp = new DPlayer(options[0]);
      });
    });
  },
  methods: {
    // 发送一个弹幕
    send(txt = "", color = "#FFFFFF", type = "right") {
      if (txt.trim()) return;
      this.dp.danmaku.send(
        {
          text: txt,
          color: color,
          type: type, // should be `top` `bottom` or `right`
        },
        () => {
          this.draw(txt, color, type);
        }
      );
    },
    // 实时绘制弹幕
    draw(txt = "", color = "#FFFFFF", type = "right") {
      if (txt.trim()) return;
      this.dp.danmaku.draw({
        text: txt,
        color: color,
        type: type,
      });
    },
  },
};
// url传一个videoID
// 后台拿着这个id去找json文件，读取后加密，返回到前端，前端解密到option
// 弹幕接口返回 { code：0，data:[]  }
//            data数组结构 [256.148, 0, 16777215, "ccf77860", "ありがとうございました"]
//                         视频时间，弹幕类型，10进制颜色，用户id（我5bc0fae6），弹幕内容
// https://s-sh-17-dplayercdn.oss.dogecdn.com/1678963.json 某个时间点爬下来的B站弹幕数据
// 1678963是个av号，demo视频就是这个
</script>

<style scoped>
.dplayer-logo{
  display: none;
}
</style>
