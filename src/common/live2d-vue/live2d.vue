<template>
  <div>
    <canvas class="live2d" :id="canvasID" :width="width" :height="height"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">
import uuid from 'uuid'
import L2dManage from 'common/live2d-vue/lib/main'

export default {
  name: "live2d",
  props:{
    width:{
      type: Number,
      default: 290
    },
    height:{
      type: Number,
      default: 240
    },
    canvasID:{
      type: String,
      default: uuid()
    },
    modelPath: String
  },
  mounted(){
    this.initL2dMange(this.modelPath)
  },
  methods:{
    initL2dMange(modelPath){
      new L2dManage(document.getElementById(this.canvasID),modelPath)
    }
  },
  watch:{
    modelPath(newPath){
      this.initL2dMange(newPath)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.live2d
  position: relative
  z-index: 99     
</style>


