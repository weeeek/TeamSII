<template>
  <div class="play-box">
    <!--歌曲列表-->
    <div id="song-list">
      <ol>
        <li v-for="(item,index) in playlist" :key="index">
          {{ index + 1 }}.{{ item.from }} - {{ item.title }}
          <a v-if="false">
            <jam-arrow-square-up />
          </a>
          <a v-if="false">
            <jam-arrow-square-down />
          </a>
          <a @click="deleteSong(item)">
            <jam-close-circle />
          </a>
        </li>
      </ol>
    </div>
    <!--当前歌曲歌词-->
    <div id="lyric-block" :style="`background-image:url('${getImg}')`"></div>
    <!--当前歌曲分析-->
    <canvas id="canvas" width="575" height="250"></canvas>
    <!--歌曲播放-->
    <audio
      id="audio"
      @loadstart="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
      @pause="paused"
      volume="0.3"
      :src="getSrc"
      autoplay
      controls
      @load="analys()"
      @playing="playing()"
      crossOrigin="anonymous"
    ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'

export default {
  name: `MusicPlay`,
  data() {
    return {
      lyrics: [],
      ctx: null,
      analyser: null,
      audioSrc: null,
      frequencyData: null,
      canvas: null,
      cwidth: null,
      cheight: null,
      meterWidth: 10,
      gap: 2,
      capHeight: 2,
      capStyle: "#FFF",
      meterNum: 800 / (10 + 2),
      capYPositionArray: [],
      gradient: null,

      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
      isPureMusic: false,
      pureMusicLyric: ""
    }
  },
  computed: {
    getSrc () {
      if(this.playlist.length > 0 && this.currentIndex >= 0)
        return  this.playlist[this.currentIndex].src
      return ""
    },
    getImg () {
      if(this.playlist.length > 0 && this.currentIndex >= 0)
        return  this.playlist[this.currentIndex].img
      return "rgba(255,255,0,.6)"
    },
    ...mapGetters(['playlist','currentIndex'])
  },
  created(){
    // console.log('music-playlist', this.playlist)
  },
  mounted() {
    this.analys()
  },
  ...mapMutations({
    setFullScreen: 'SET_FULL_SCREEN',
    setPlayingState: 'SET_PLAYING_STATE'
  }),
  ...mapActions([
    'savePlayHistory',
    'deleteSong',
    'playing'
  ]),
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    error() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    end() {
      this.currentTime = 0
      if (this.mode === this.playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    ready() {
      clearTimeout(this.timer)
      // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
      this.songReady = true
      this.canLyricPlay = true
      this.savePlayHistory(this.currentSong)
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      if (this.currentLyric && !this.isPureMusic) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    paused() {
      this.setPlayingState(false)
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    analys() {
      window.AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext
      this.ctx = new AudioContext()
      this.analyser = this.ctx.createAnalyser()
      this.audio = document.getElementById("audio")
      this.audio.volume = 0.3
      this.audioSrc = this.ctx.createMediaElementSource(this.audio)
      // we have to connect the MediaElementSource with the analyser
      this.audioSrc.connect(this.analyser)
      this.analyser.connect(this.ctx.destination)
      // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
      // analyser.fftSize = 64
      // frequencyBinCount tells you how many values you'll receive from the analyser
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
      // we're ready to receive some data!
      this.canvas = document.getElementById("canvas")
      this.cwidth = this.canvas.width
      this.cheight = this.canvas.height - 2
      this.meterWidth = 10 //width of the meters in the spectrum
      this.gap = 2 //gap between meters
      this.capHeight = 2
      this.capStyle = "#fff"
      this.meterNum = 800 / 10 //count of the meters
      this.capYPositionArray = [] ////store the vertical position of hte caps for the preivous frame
      this.ctx = this.canvas.getContext("2d")
      this.gradient = this.ctx.createLinearGradient(0, 0, 0, 300)
      // 0f0绿，ff0红 f00黄
      this.gradient.addColorStop(1, "#0f0")
      this.gradient.addColorStop(0.5, "#ff0")
      this.gradient.addColorStop(0, "#f00")
    },
    playing() {
      let _this = this
      function renderFrame() {
        var array = new Uint8Array(_this.analyser.frequencyBinCount)
        _this.analyser.getByteFrequencyData(array)
        var step = Math.round(array.length / _this.meterNum) //sample limited data from the total array
        _this.ctx.clearRect(0, 0, _this.cwidth, _this.cheight)
        for (var i = 0; i < _this.meterNum; i++) {
          var value = array[i * step]
          if (_this.capYPositionArray.length < Math.round(_this.meterNum)) {
            _this.capYPositionArray.push(value)
          }
          _this.ctx.fillStyle = _this.capStyle
          //draw the cap, with transition effect
          if (value < _this.capYPositionArray[i]) {
            _this.ctx.fillRect(
              i * 12,
              _this.cheight - --_this.capYPositionArray[i],
              _this.meterWidth,
              _this.capHeight
            )
          } else {
            _this.ctx.fillRect(
              i * 12,
              _this.cheight - value,
              _this.meterWidth,
              _this.capHeight
            )
            _this.capYPositionArray[i] = value
          }
          _this.ctx.fillStyle = _this.gradient //set the filllStyle to gradient for a better look
          _this.ctx.fillRect(
            i * 12 /*meterWidth+gap*/,
            _this.cheight - value + _this.capHeight,
            _this.meterWidth,
            _this.cheight
          ) //the meter
        }
        requestAnimationFrame(renderFrame)
      }
      renderFrame()
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.canLyricPlay = false
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ""
        this.currentLineNum = 0
      }
      this.$refs.audio.src = newSong.url
      this.$refs.audio.play()
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 5000)
      this.getLyric()
    },
    playing(newPlaying) {
      if (!this.songReady) {
        return
      }
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
      if (!newPlaying) {
        if (this.fullScreen) {
          this.syncWrapperTransform("imageWrapper", "image")
        } else {
          this.syncWrapperTransform("miniWrapper", "miniImage")
        }
      }
    },
    fullScreen(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$refs.lyricList.refresh()
          this.$refs.progressBar.setProgressOffset(this.percent)
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
.play-box
  width 100%
  height 100%
  background #91ccea
  
  #song-list
    height 150px
    background #999
    padding 4px 10px
    ol
      overflow-y auto
      li
        line-height 24px
        margin 6px 0
        a
          cursor pointer
          float right
  canvas
    width 100%
    height 250px
    filter blur(0px)
    background #CCC
  #lyric-block
    filter blur(5px)
    height calc(100% - 150px - 250px - 50px + 2px)    
    background-image rgba(255,255,0,.6)
  #audio
    margin-top -2px
    width 100%
    height 50px
    background white
</style>
