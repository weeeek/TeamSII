<template>
  <div class="block">
    <div class="service-item service-item-taste">
      <h2 class="service-item-title">产品体验-语音听写（流式版）WebAPI</h2>
      <div class="service-item-content service-item-taste-content">
        <div class="taste-content" v-show="currentStatus !== 'ing'">
          <button
            class="taste-button ready-button"
            :class="`status-${currentStatus}`"
            @click="taste"
          >开始识别</button>
        </div>
        <div class="start-taste" :class="{'flex-display-1': currentStatus === 'ing'}">
          <div class="start-taste-left">
            <div class="time-box" v-show="currentStatus === 'init'">
              <span
                class="start-taste-line"
              ><hr :class="{'hr': this.currentStatus === "ing"}" class="hr1" /></span>
              <span class="total-time">
                <span class="used-time" v-model="usedTime"></span> / 01: 00
              </span>
            </div>
            <div class="start-taste-button">
              <button class="taste-button start-button" @click="taste">结束识别</button>
            </div>
          </div>
          <div class="output-box" v-model="resultText"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Created by lycheng on 2019/8/1.
 *
 * 语音听写流式 WebAPI 接口调用示例 接口文档（必看）：https://doc.xfyun.cn/rest_api/语音听写（流式版）.html
 * webapi 听写服务参考帖子（必看）：http://bbs.xfyun.cn/forum.php?mod=viewthread&tid=38947&extra=
 * 语音听写流式WebAPI 服务，热词使用方式：登陆开放平台https://www.xfyun.cn/后，找到控制台--我的应用---语音听写---个性化热词，上传热词
 * 注意：热词只能在识别的时候会增加热词的识别权重，需要注意的是增加相应词条的识别率，但并不是绝对的，具体效果以您测试为准。
 * 错误码链接：
 * https://www.xfyun.cn/doc/asr/voicedictation/API.html#%E9%94%99%E8%AF%AF%E7%A0%81
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 * 语音听写流式WebAPI 服务，方言或小语种试用方法：登陆开放平台https://www.xfyun.cn/后，在控制台--语音听写（流式）--方言/语种处添加
 * 添加后会显示该方言/语种的参数值
 *
 */

// 1. websocket连接：判断浏览器是否兼容，获取websocket url并连接，这里为了方便本地生成websocket url
// 2. 获取浏览器录音权限：判断浏览器是否兼容，获取浏览器录音权限，
// 3. js获取浏览器录音数据
// 4. 将录音数据处理为文档要求的数据格式：采样率16k或8K、位长16bit、单声道；该操作属于纯数据处理，使用webWork处理
// 5. 根据要求（采用base64编码，每次发送音频间隔40ms，每次发送音频字节数1280B）将处理后的数据通过websocket传给服务器，
// 6. 实时接收websocket返回的数据并进行处理

// ps: 该示例用到了es6中的一些语法，建议在chrome下运行

// import CryptoJS from 'crypto-js'
// import Enc from 'enc'
// import VConsole from 'vconsole'
// import 'js/jquery.js'
// import TransWorker from 'js/transcode.worker.js'
import "@/assets/plugins/xfyun/voicedicatation.css";
// import { API_SECRET, API_KEY } from "@/config/xfyun.js";
import IatRecorder from "@/assets/plugins/xfyun/iatRecorder.js";

export default {
  data() {
    return {
      currentStatus: "",
      currentText: "",
      iatRecorder: new IatRecorder(),
      usedTime: "00:00"
    };
  },
  methods: {
    taste() {
      if (this.iatRecorder.status === "ing") {
        this.iatRecorder.stop();
      } else {
        this.iatRecorder.start();
      }
    }
  },
  computed: {
      resultText(){
          return this.iatRecorder.resultText;
      }
  },
  mounted() {
    this.iatRecorder = new IatRecorder();
    this.iatRecorder.onWillStatusChange = (oldStatus, status) => {
      // 可以在这里进行页面中一些交互逻辑处理：倒计时（听写只有60s）,录音的动画，按钮交互等
      // 按钮中的文字
      let text = {
        null: "开始识别", // 最开始状态
        init: "开始识别", // 初始化状态
        ing: "结束识别", // 正在录音状态
        end: "开始识别" // 结束状态
      };
      let senconds = 0;
      this.currentStatus = status;
      this.currentText = text[status];
      let countInterval = () => {};
      if (this.currentStatus === "ing") {
        // 倒计时相关
        countInterval = setInterval(() => {
          senconds++;
          this.usedTime = `0${Math.floor(senconds / 60)}：${Math.floor(
            senconds / 10
          )}${senconds % 10}`;
          if (senconds >= 60) {
            this.iatRecorder.stop();
            clearInterval(countInterval);
          }
        }, 1000);
      } else if (this.currentStatus === "init") {
        this.usedTime = "00:00";
      } else {
        clearInterval(countInterval);
      }
    };
  }
};
</script>