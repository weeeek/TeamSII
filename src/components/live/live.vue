<template>
  <div class="block">
    <Aliplayer
      ref="player"
      class="aliplayer"
      width="500px"
      height="400px"
      control-bar-visibility="hover"
      :source="url"
    />
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
    <button @click="replay">重播</button>
  </div>
</template>

<script type="text/ecmascript-6">
import Aliplayer from 'vue-aliplayer'
export default {
  name: 'Documentation',
  components: { Aliplayer },
  data () {
    return {
      url: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
    }
  },
  methods: {
    play () {
      const player = this.$refs.player.instance
      player && player.play()
    },
    pause () {
      const player = this.$refs.player.instance
      player && player.pause()
    },
    replay () {
      const player = this.$refs.player.instance
      player && player.replay()
    }
  }
}
</script>

<style lang="stylus" scoped>
video {
  width: 540px;
  height: 960px;
}
</style>
