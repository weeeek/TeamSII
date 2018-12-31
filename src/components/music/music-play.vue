<template>
    <div v-show="resource" class="play-box">
        <div id="lyric-block"></div>
        <canvas id="canvas" width="400" height="300"></canvas>
        <audio id="audio" crossorigin="anonymous" volume="0.5"  :src="resource" autoplay controls @load="analys()" @playing="playing()"></audio>
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
          lyrics: [],
          ctx:null,
          analyser:null,
          audioSrc:null,
          frequencyData:null,
          canvas:null,
          cwidth:null,
          cheight:null,
          meterWidth:10,
          gap:2,
          capHeight:2,
          capStyle:'#FFF',
          meterNum:800 / (10+2),
          capYPositionArray:[],
          gradient:null
        }
      },
      mounted () {
        this.analys()
      },
      methods: {
        analys () {
            console.log("onload")
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
            this.ctx = new AudioContext()
            this.analyser = this.ctx.createAnalyser()
            this.audio = document.getElementById('audio')
            this.audio.volume = 0.3;
            this.audioSrc = this.ctx.createMediaElementSource(this.audio)
            // we have to connect the MediaElementSource with the analyser
            this.audioSrc.connect(this.analyser)
            this.analyser.connect(this.ctx.destination)
            // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
            // analyser.fftSize = 64;
            // frequencyBinCount tells you how many values you'll receive from the analyser
            this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
            // we're ready to receive some data!
            this.canvas = document.getElementById('canvas')
            this.cwidth = this.canvas.width
            this.cheight = this.canvas.height - 2
            this.meterWidth = 10 //width of the meters in the spectrum
            this.gap = 2 //gap between meters
            this.capHeight = 2
            this.capStyle = '#fff'
            this.meterNum = 800 / (10 + 2) //count of the meters
            this.capYPositionArray = [] ////store the vertical position of hte caps for the preivous frame
            this.ctx = this.canvas.getContext('2d')
            this.gradient = this.ctx.createLinearGradient(0, 0, 0, 300)
            this.gradient.addColorStop(1, '#0f0')
            this.gradient.addColorStop(0.5, '#ff0')
            this.gradient.addColorStop(0, '#f00')
        },
        playing () {
            let _this = this;
            function renderFrame() {
                var array = new Uint8Array(_this.analyser.frequencyBinCount);
                _this.analyser.getByteFrequencyData(array);
                var step = Math.round(array.length / _this.meterNum); //sample limited data from the total array
                _this.ctx.clearRect(0, 0, _this.cwidth, _this.cheight);
                for (var i = 0; i < _this.meterNum; i++) {
                    var value = array[i * step];
                    if (_this.capYPositionArray.length < Math.round(_this.meterNum)) {
                        _this.capYPositionArray.push(value);
                    };
                    _this.ctx.fillStyle = _this.capStyle;
                    //draw the cap, with transition effect
                    if (value < _this.capYPositionArray[i]) {
                        _this.ctx.fillRect(i * 12, _this.cheight - (--_this.capYPositionArray[i]), _this.meterWidth, _this.capHeight);
                    } else {
                        _this.ctx.fillRect(i * 12, _this.cheight - value, _this.meterWidth, _this.capHeight);
                        _this.capYPositionArray[i] = value;
                    };
                    _this.ctx.fillStyle = _this.gradient; //set the filllStyle to gradient for a better look
                    _this.ctx.fillRect(i * 12 /*meterWidth+gap*/, _this.cheight - value + _this.capHeight, _this.meterWidth, _this.cheight); //the meter
                }
                requestAnimationFrame(renderFrame);
            }
            renderFrame();
        }
      }
    }
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
.play-box
  width 400px
  height 100%
  background #91ccea
  canvas  
    filter blur(0px)
  #lyric-block
    height calc(100vh - 350px)
  #audio
    width 100%
    height 50px

</style>
