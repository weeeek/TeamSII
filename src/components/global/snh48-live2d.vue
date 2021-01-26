<template>
  <div id="live-snh" v-if="live2dInitDone">
    <div class="live2d-panel">
      <dialogue ref="dialogue" v-if="isDialogue" :customDialogue="customDialogue"></dialogue>
      <live2d :width="width" :height="height" v-if="this.islive2d" :modelPath="this.modelPath" ref="l2dMange"></live2d>  
    </div>
    <div class="tools-panel">
      <live2dTools v-for="(item,index) in toolsData" :key="index" v-if="item.show" @click="toolsClick(item)" :width="item.width" :toolsID="item.tabMsg" :tabMsg="item.tabMsg" :customDialogue='item.customDialogue' :backgroundColor="item.backgroundColor" ref="tool"></live2dTools>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getLive2dCofnig } from 'config/snh48-live2d'

export default {
  props:{
    autoFetch:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      modelPath: "http://47.97.248.244/static/live2d/Terisa/model.json",
      customDialogue: {},
      toolsData: [
        { tabMsg: "home", backgroundColor: "#ff0", show: false },
        { tabMsg: "dialogue", width: 280, customDialogue: {}, show: true },
        { tabMsg: "change", backgroundColor: "#add8e6", show: false },
        { tabMsg: "save", backgroundColor: "green", show: false },
        { tabMsg: "about", backgroundColor: "#eb7a77", show: false },
        { tabMsg: "x", backgroundColor: "red", show: true }
      ],
      islive2d: true,
      isDialogue: false,
      width: 300,
      height: 400,
      live2dInitDone: false,
      interval: null
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      let _vm = this
      getLive2dCofnig().then(res => {
        _vm.live2dInitDone = true;
        _vm.customDialogue = res;
        _vm.toolsData[1].customDialogue = res;
        //  一言网(Hitokoto.cn)创立于2016年，隶属于萌创Team，目前网站主要提供一句话服务。
        if(this.autoFetch)
          _vm.interval = setInterval(() => {
            fetch(
              "https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json"
            ).then(res => res.json()).then(data => {
                if (!_vm.isDialogue) {
                  let tool = _vm.$refs.tool.filter(item => {
                    return item.customDialogue
                  })
                  if (tool && tool.length > 0) tool[0].showMessage(data.hitokoto);
                } else {
                  _vm.$refs.dialogue.showMessage(data.hitokoto)
                }
              })
          }, 30000)
        else
          clearInterval(_vm.interval)
      })
    },
    toolsClick(item) {
      switch (item.tabMsg) {
        case "x":
        case "hide":
          this.islive2d = false;
          this.toolsDisplay("hide")
          break
        case "show":
          this.islive2d = true;
          this.toolsDisplay("show")
          break
        case "dialogue":
          break;
      }
    },
    toolsDisplay(display) {
      for (let i = 0, len = this.toolsData.length; i < len; i++) {
        let tabMsg = this.toolsData[i].tabMsg
        if (display === "hide") {
          if (tabMsg === "home" || tabMsg === "about") continue;
          this.toolsData[i].show = false
          if (tabMsg === "hide") {
            this.toolsData[i].show = true
            this.toolsData[i].tabMsg = "show"
          }
        } else {
          this.toolsData[i].show = true
          if (tabMsg === "show") this.toolsData[i].tabMsg = "hide"
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#live-snh
    position relative
.tools-panel
    position fixed
    left 0
    bottom 0
    max-width 32px
.live2d-panel
    position fixed
    left 0
    bottom 0
</style>
