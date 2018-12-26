<template>
    <div v-show="resource">
        <div id="lyric-block"></div>
        <canvas id="canvas" width="400" height="300"></canvas>
        <audio id="audio" :src="resource"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: `MusicPlay`,
      props: {
        resource: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
          lyrics: []
        }
      },
      created () {

      },
      methods: {

      }
    }
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
  #lyric-block
    height calc(100vh - 350px)
  #audio
    height 50px
</style>

