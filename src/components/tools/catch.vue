<template>
  <div class="block">
    <div class="search">
      <div class="search-box">
        <jam-search @click="urlChange" />
        <input v-model="room" class="box" placeholder="视频源"/>
      </div>
    </div>
    <div>
        <iframe ref="iframe" :src="frame" style="width:100%;height:400px;" />
    </div>
    <div>
        <input v-model="m3u8" class="box" placeholder="m3u8地址" />
    </div>
  </div>
</template>

<script>
// 抓源
export default {
    data(){
        return {
            room: "https://live.48.cn/Index/invideo/club/1/id/3944",
            frame: "",
            m3u8: ""
        }
    },
    methods:{
        urlChange(){
            this.frame = this.room;
            console.log(this.$refs.iframe.document)
        }
    },
    mounted(){

    },
    beforeDestroy(){
    }
}
</script>

<style>

</style>