<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" v-if="currentSong && currentSong.image" :src="currentSong.image.url">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <jam-chevron-circle-down :fillColor="fillColor"/>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" ref="imageWrapper">                
                <img ref="image" :class="cdCls" class="image" v-if="currentSong && currentSong.image" :src="currentSong.image.url" :style="`object-position:${currentSong.image.left} ${currentSong.image.right};object-fit:${currentSong.image.objectfit}`"/>
              </div>
            </div>
            <!-- <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div> -->
            <!-- <canvas ref="canvas" id="canvas" width="575" height="250"></canvas> -->
          </div>
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line,index) in currentLyric.lines" :key="index" v-html="line.txt"></p>
              </div>
              <div class="pure-music" v-show="isPureMusic">
                <p>{{pureMusicLyric}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar ref="progressBar" :percent="percent" @percentChange="onProgressBarChange"
                            @percentChanging="onProgressBarChanging"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <jam-set-backward-circle :fillColor="fillColor" @click="prev"/>
            </div>
            <div class="icon i-center" :class="disableCls">
              <jam-play v-if="!playIcon" :fillColor="fillColor" @click="togglePlaying"/>
              <jam-pause v-if="playIcon" :fillColor="fillColor" @click="togglePlaying"/>              
            </div>
            <div class="icon i-right" :class="disableCls">
              <jam-set-forward-circle @click="next" :fillColor="fillColor"/>
            </div>
            <div class="icon i-right">
              <i @click="toggleFavorite(currentSong)" class="icon" :class="favoriteIcon"></i>
            </div>
            <!-- <div class="icon i-right">
              <i :class="volumeIcon"></i>
            </div> -->
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <div class="imgWrapper" ref="miniWrapper">
            <img ref="miniImage" :class="cdCls" width="40" height="40" v-if="currentSong && currentSong.image" :src="currentSong.image.url" :style="`object-position:${currentSong.image.left} ${currentSong.image.right}`"/>
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="currentLyc" v-if="currentLyric" v-html="currentLyric.lines[currentLineNum].txt"></div>
        <div class="currentLyc" v-if="!currentLyric"></div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <div class="icon-mini">
              <jam-play :fillColor="fillColor" v-if="!miniIcon" @click="togglePlaying"/>
              <jam-pause :fillColor="fillColor" v-if="miniIcon" @click="togglePlaying"/>
            </div>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <jam-unordered-list :fillColor="fillColor" />
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio ref="audio" @playing="ready" @error="error" @timeupdate="updateTime" @ended="end" @pause="paused" volume="0.3"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import animations from 'create-keyframe-animation'
  import { prefixStyle } from 'common/js/dom'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import { playMode } from 'common/js/config'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import { playerMixin } from 'common/js/mixin'
  import Playlist from 'components/music/playlist'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')

  const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g

  export default {
    mixins: [playerMixin],
    data() {
      return {
        fillColor: '#87cefa',

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
        currentShow: 'cd',
        playingLyric: '',
        isPureMusic: false,
        pureMusicLyric: ''
      }
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : ''
      },
      playIcon() {
        return this.playing
        // return this.playing ? 'icon-pause' : 'icon-play'
      },
      volumeIcon() {        
        // return this.volume==0 ? 'icon-volume' : 'icon-play'
        return 'icon-play'
      },
      miniIcon() {
        // return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        return this.playing
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        'volume',
        'currentIndex',
        'fullScreen',
        'playing'
      ])
    },
    created() {
      this.touch = {}
    },
    mounted () {      
      // this.analys()
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
        if(this.currentSong.notQQMusic){
          this.isPureMusic = true
          return
        }
        this.currentSong.getLyric(this.currentSong.mid).then((lyric) => {
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
        'savePlayHistory'
      ])
      // analys() {
      //   window.AudioContext =
      //     window.AudioContext ||
      //     window.webkitAudioContext ||
      //     window.mozAudioContext        
      //   this.ctx = new AudioContext()
      //   this.analyser = this.ctx.createAnalyser()
      //   //this.audio = document.getElementById("audio")
      //   this.audio = this.$refs.audio
      //   // this.audio.volume = 0.3
      //   this.audioSrc = this.ctx.createMediaElementSource(this.audio)
      //   // we have to connect the MediaElementSource with the analyser
      //   this.audioSrc.connect(this.analyser)
      //   this.analyser.connect(this.ctx.destination)
      //   // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
      //   // analyser.fftSize = 64
      //   // frequencyBinCount tells you how many values you'll receive from the analyser
      //   this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
      //   // we're ready to receive some data!
      //   this.canvas = this.$refs.canvas
      //   this.cwidth = this.canvas.width
      //   this.cheight = this.canvas.height - 2
      //   this.meterWidth = 10 //width of the meters in the spectrum
      //   this.gap = 2 //gap between meters
      //   this.capHeight = 2
      //   this.capStyle = "#fff"
      //   this.meterNum = 800 / 10 //count of the meters
      //   this.capYPositionArray = [] ////store the vertical position of hte caps for the preivous frame
      //   this.ctx = this.canvas.getContext("2d")
      //   this.gradient = this.ctx.createLinearGradient(0, 0, 0, 300)
      //   // 0f0绿，ff0红 f00黄
      //   this.gradient.addColorStop(1, "#0f0")
      //   this.gradient.addColorStop(0.5, "#ff0")
      //   this.gradient.addColorStop(0, "#f00")
      // },
      // loadstart() {
      //   let _this = this
      //   function renderFrame() {
      //     var array = new Uint8Array(_this.analyser.frequencyBinCount)
      //     _this.analyser.getByteFrequencyData(array)
      //     var step = Math.round(array.length / _this.meterNum) //sample limited data from the total array
      //     _this.ctx.clearRect(0, 0, _this.cwidth, _this.cheight)
      //     for (var i = 0; i < _this.meterNum; i++) {
      //       var value = array[i * step]
      //       if (_this.capYPositionArray.length < Math.round(_this.meterNum)) {
      //         _this.capYPositionArray.push(value)
      //       }
      //       _this.ctx.fillStyle = _this.capStyle
      //       //draw the cap, with transition effect
      //       if (value < _this.capYPositionArray[i]) {
      //         _this.ctx.fillRect(
      //           i * 12,
      //           _this.cheight - --_this.capYPositionArray[i],
      //           _this.meterWidth,
      //           _this.capHeight
      //         )
      //       } else {
      //         _this.ctx.fillRect(
      //           i * 12,
      //           _this.cheight - value,
      //           _this.meterWidth,
      //           _this.capHeight
      //         )
      //         _this.capYPositionArray[i] = value
      //       }
      //       _this.ctx.fillStyle = _this.gradient //set the filllStyle to gradient for a better look
      //       _this.ctx.fillRect(
      //         i * 12 /*meterWidth+gap*/,
      //         _this.cheight - value + _this.capHeight,
      //         _this.meterWidth,
      //         _this.cheight
      //       ) //the meter
      //     }
      //     requestAnimationFrame(renderFrame)
      //   }
      //   renderFrame()
      // }
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong || !newSong.id || !newSong.url || newSong.id === oldSong.id || !this.$refs.audio) {
          return
        }
        this.songReady = false
        this.canLyricPlay = false
        if (this.currentLyric) {
          this.currentLyric.stop()
          // 重置为null
          this.currentLyric = null
          this.currentTime = 0
          this.playingLyric = ''
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
            this.syncWrapperTransform('imageWrapper', 'image')
          } else {
            this.syncWrapperTransform('miniWrapper', 'miniImage')
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
      },
      currentVolume(num){
        if(num){
          const audio = this.$refs.audio
          audio.volume = num / 100;
        }
      }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll,
      Playlist
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
@import "~common/stylus/animation"
.player
  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 150
    background $color-background
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      opacity 0.6
      filter blur(20px)
    .top
      position relative
      margin-bottom 40px
      .back
        position absolute
        top 1em
        left 1em
        z-index 50
        .icon-back
          display block
          padding 9px
          font-size $font-size-large-x
          color $color-theme
          transform rotate(-90deg)
      .title
        width 70%
        margin 0 auto
        line-height 40px
        text-align center
        no-wrap()
        font-size $font-size-large
        color $color-text
      .subtitle
        line-height 20px
        text-align center
        font-size $font-size-medium
        color $color-text
    .middle
      display flex
      width 100%
      height calc(100% - 80px - 180px)        
      white-space nowrap
      justify-content center
      .middle-l
        padding-top 50px
        vertical-align top
        .cd-wrapper
          box-sizing border-box
          .cd
            margin 0 auto
            border-radius 50%
            .image
              width 100%
              height 100%
              box-sizing border-box
              border-radius 50%
              border 10px solid rgba(255, 255, 255, 0.1)
              &.image-object-p-left
                object-position left
              &.image-object-p-right
                object-position right
              &.image-object-p-top
                object-position top
              &.image-object-p-bottom
                object-position bottom
            .play
              animation rotate 20s linear infinite
        .playing-lyric-wrapper
          width 80%
          margin 30px auto 0 auto
          overflow hidden
          text-align center
          .playing-lyric
            height 20px
            line-height 20px
            font-size $font-size-medium
            color $color-text-l
      .middle-r
        vertical-align top
        overflow hidden
        .lyric-wrapper
          margin 0 auto
          overflow hidden
          text-align center
          padding 50px 30px
          .text
            line-height 32px
            color $color-text-l
            font-size $font-size-medium
            transition all .6s ease-in-out
            &.current
              color $color-text
              font-size 1.4em
              text-shadow 0 0 5px #fff, 0 0 10px $color-team-sii, 0 0 15px $color-team-sii, 0 0 20px $color-team-sii, 0 0 35px $color-team-sii, 0 0 40px $color-team-sii, 0 0 50px $color-team-sii, 0 0 75px $color-team-sii
          .pure-music
            padding-top 50%
            line-height 32px
            color $color-text-l
            font-size $font-size-medium
    .bottom
      position absolute
      bottom 50px
      width 100%
      .dot-wrapper
        text-align center
        font-size 0
        .dot
          display inline-block
          vertical-align middle
          margin 0 4px
          width 8px
          height 8px
          border-radius 50%
          background $color-text-l
          &.active
            width 20px
            border-radius 5px
            background $color-text-ll
      .progress-wrapper
        display flex
        align-items center
        width 80%
        margin 0px auto
        padding 10px 0
        .time
          color $color-text
          font-size $font-size-small
          flex 0 0 30px
          line-height 30px
          &.time-l
            text-align left
          &.time-r
            text-align right
        .progress-bar-wrapper
          flex 1
        .volume
          flex 0 0 30px
          line-height 30px
          &.volume-center
            text-aligncenter
          .icon
            flex 1
            color $color-theme
      .operators
        display flex
        align-items center
        .icon
          cursor pointer
          flex 1
          color $color-theme
          &.disable
            color $color-theme-d
          i
            font-size 30px
        .i-left
          text-align right
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 40px
        .i-right
          text-align left
        .icon-favorite
          color $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition all 0.4s
      .top, .bottom
        transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity 0
      .top
        transform translate3d(0, -100px, 0)
      .bottom
        transform translate3d(0, 100px, 0)
  .mini-player
    display flex
    align-items center
    position fixed
    left 0
    bottom 0
    z-index 180
    width 100%
    height 60px
    background $color-highlight-background
    .currentLyc
      color white !important
      text-shadow 0 0 5px #fff, 0 0 10px $color-team-sii, 0 0 15px $color-team-sii, 0 0 20px $color-team-sii, 0 0 35px $color-team-sii, 0 0 40px $color-team-sii, 0 0 50px $color-team-sii, 0 0 75px $color-team-sii !important
    &.mini-enter-active, &.mini-leave-active
      transition all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity 0
    .icon
      flex 0 0 40px
      height 40px
      padding 0 10px 0 10px
      .imgWrapper
        height 100%
        width 100%
        img
          border-radius 50%
          &.play
            animation rotate 10s linear infinite
          &.pause
            animation-play-state paused
    .text
      display flex
      flex-direction column
      justify-content center
      flex 0 0 180px
      line-height 20px
      overflow hidden
      .name
        margin-bottom 2px
        no-wrap()
        font-size $font-size-medium
        color $color-text
      .desc
        no-wrap()
        font-size $font-size-small
        color $color-text-d
    .currentLyc
      flex 1
      line-height 60px
      color $color-team-sii
      font-size 24px
      text-shadow 0 0 1px #fff, 0 0 2px $color-team-sii, 0 0 3px $color-team-sii, 0 0 4px $color-team-sii, 0 0 5px $color-team-sii
    .control
      flex 0 0 30px
      padding 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size 30px
        color $color-theme-d
      .icon-mini
        font-size 32px
        position absolute
        left 4px
        top -1px
@media screen and (min-width 1200px)
  .middle-l
    flex 0 0 50%
    .cd-wrapper
      .cd        
        width 600px
        height 600px
  .middle-r
    flex 0 0 50%
@media screen and (max-width 1200px) and (min-width 1000px)
  .middle-l
    flex 0 0 50%
    .cd-wrapper
      .cd        
        width 500px
        height 500px
  .middle-r
    flex 0 0 50%
    
@media screen and (max-width 1000px)
  .player
    .normal-player
      .middle
        flex-direction column
        .middle-l
          flex 0 0 320px
          .cd-wrapper
            .cd
              width 320px
              height 320px
        .middle-r
          padding-top 10px
          flex 0 0 280px
          position relative
          .lyric-wrapper
            padding 30px 15px
    .mini-player
      .text
        flex 0 0 70px
        display none
      .currentLyc
        text-align center
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        padding 0 15px
        font-size 20px
</style>
