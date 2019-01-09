<template>
  <div class="play-box">
    <!--歌曲列表-->
    <div id="song-list">
      <ol>
        <li v-for="(item,index) in playlist" :key="index">
          {{ index + 1 }}.{{ item.songname }}
          <a v-if="false">
            <jam-arrow-square-up />
          </a>
          <a v-if="false">
            <jam-arrow-square-down />
          </a>
          <a @click="deleteOne(item)">
            <jam-close-circle />
          </a>
        </li>
      </ol>
    </div>
    <!--当前歌曲歌词-->
    <div id="lyric-block" :style="`background-image:url('${albumImg}')`">
      <div class="playing-lyric">{{playingLyric}}</div>
    </div>
    <!--当前歌曲分析-->
    <canvas id="canvas" width="575" height="250"></canvas>
    <!--歌曲播放-->
    <audio controls ref="audio" @loadstart="loadstart" @playing="ready" @error="error" @timeupdate="updateTime" 
      volume="0.3" @ended="end" @pause="paused"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import animations from 'create-keyframe-animation'
  import { prefixStyle } from 'common/js/dom'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import { playMode } from 'common/js/config'
  import { getLyric, getVKey } from 'api/song'
  import Song from 'common/js/song'
  import { getUid } from 'common/js/uid'
  import { ERR_OK } from 'api/config'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import { playerMixin } from 'common/js/mixin'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g

  export default {
    mixins: [playerMixin],
    data() {
      return {
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
        
        albumImg: '',
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        playingLyric: '',
        isPureMusic: false,
        pureMusicLyric: ''
      }
    },
    computed: {      
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playing'
      ])
    },
    mounted () {
      this.analys()
    },
    created () {
      this.touch = {}
    },
    methods: {
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()

        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        const timer = setTimeout(done, 400)
        this.$refs.cdWrapper.addEventListener('transitionend', () => {
          clearTimeout(timer)
          done()
        })
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
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
        if (this.mode === playMode.loop) {
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
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
      },
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playlist.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
      },
      ready() {
        clearTimeout(this.timer)
        // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
        this.songReady = true
        this.canLyricPlay = true
        // this.savePlayHistory(this.currentSong)
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
      error() {
        clearTimeout(this.timer)
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      onProgressBarChanging (percent) {
        this.currentTime = this.currentSong.duration * percent
        if (this.currentLyric) {
          this.currentLyric.seek(this.currentTime * 1000)
        }
      },
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.currentTime = this.$refs.audio.currentTime = currentTime
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          this.isPureMusic = !this.currentLyric.lines.length
          if (this.isPureMusic) {
            this.pureMusicLyric = this.currentLyric.lrc.replace(timeExp, '').trim()
            this.playingLyric = this.pureMusicLyric
          } else {
            if (this.playing && this.canLyricPlay) {
              // 这个时候有可能用户已经播放了歌曲，要切到对应位置
              this.currentLyric.seek(this.currentTime * 1000)
            }
          }
        }).catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },
      handleLyric({lineNum, txt}) {
        if (!this.$refs.lyricLine) {
          return
        }
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      showPlaylist() {
        this.$refs.playlist.show()
      },
      middleTouchStart(e) {
        this.touch.initiated = true
        // 用来判断是否是一次移动
        this.touch.moved = false
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd() {
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      /**
       * 计算内层Image的transform，并同步到外层容器
       * @param wrapper
       * @param inner
       */
      syncWrapperTransform (wrapper, inner) {
        if (!this.$refs[wrapper]) {
          return
        }
        let imageWrapper = this.$refs[wrapper]
        let image = this.$refs[inner]
        let wTransform = getComputedStyle(imageWrapper)[transform]
        let iTransform = getComputedStyle(image)[transform]
        imageWrapper.style[transform] = wTransform === 'none' ? iTransform : iTransform.concat(' ', wTransform)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
      ...mapActions([
        // 'savePlayHistory',
        'deleteSong',
        'setCurrentUrl'
      ]),      
      analys() {
        window.AudioContext =
          window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext
        this.ctx = new AudioContext()
        this.analyser = this.ctx.createAnalyser()
        //this.audio = document.getElementById("audio")
        this.audio = this.$refs.audio
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
      loadstart() {
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
      },      
      deleteOne(item) {
        if (item.deleting) {
          return
        }
        item.deleting = true
        this.deleteSong(item)
        if (!this.playlist.length) {
          this.hide()
        }
        setTimeout(() => {
          item.deleting = false
        }, 300)
      },
      hide () {

      }
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong.songid || !newSong.url || newSong.songid === oldSong.songid) {
          if (!newSong.url) {
            let filename = `C400${newSong.songmid}.m4a`
            let guid = getUid()
            getVKey(newSong.songmid, filename, guid).then((res) => {
              if (res.code === ERR_OK) {
                const vkey = res.data.items[0].vkey
                const hostStr = 'http://dl.stream.qqmusic.qq.com'
                
                this.setCurrentUrl(`${hostStr}/${filename}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`)
                this.$refs.audio.src = newSong.url
                this.$refs.audio.play()
              }
            })
          }
          return
        }
        this.songReady = false
        this.canLyricPlay = false
        // if (this.currentLyric) {
        //   this.currentLyric.stop()
        //   // 重置为null
        //   this.currentLyric = null
        //   this.currentTime = 0
        //   this.playingLyric = ''
        //   this.currentLineNum = 0
        // }
        this.albumImg = newSong.image || "/TeamSII/dist/static/images/flag.jpg"
        this.$refs.audio.crossOrigin = 'anonymous';
        this.$refs.audio.src = newSong.url
        this.$refs.audio.play()
        // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.songReady = true
        }, 5000)
        // this.getLyric()
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
            this.syncWrapperTransform('imageWrapper', 'image')
          } else {
            this.syncWrapperTransform('miniWrapper', 'miniImage')
          }
        }
      },
      fullScreen(newVal) {
        if (newVal) {
          setTimeout(() => {
            if(this.$refs.lyricList){
              this.$refs.lyricList.refresh()
              this.$refs.progressBar.setProgressOffset(this.percent)
            }
          }, 20)
        }
      }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll
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
    background-size cover
    background-position center center
    background-repeat no-repeat
    animation filter-blur 5s linear infinite
  audio
    margin-top -2px
    width 100%
    height 50px
    background white
</style>
