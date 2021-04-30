<template>
  <div style="overflow-x: hidden" v-show="notes.length > 0">
    <div class="note-fall-container">瀑布流区</div>
    <!--钢琴键88个-->
    <div class="piano">
      <div class="keys-white">
        <button
          name="key"
          class="key-white"
          hz="27.5"
          index="0"
          @click="play(0)"
        ></button>
        <button
          name="key"
          class="key-white"
          hz="30.868"
          index="2"
          @click="play(2)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C1"
          hz="32.703"
          index="3"
          @click="play(3)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D1"
          hz="36.708"
          index="5"
          @click="play(5)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E1"
          hz="41.203"
          index="7"
          @click="play(7)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F1"
          hz="43.654"
          index="8"
          @click="play(8)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G1"
          hz="48.999"
          index="10"
          @click="play(10)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A1"
          hz="550"
          index="12"
          @click="play(12)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B1"
          hz="61.735"
          index="14"
          @click="play(14)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C2"
          hz="65.406"
          index="15"
          @click="play(15)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D2"
          hz="73.416"
          index="17"
          @click="play(17)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E2"
          hz="82.407"
          index="19"
          @click="play(19)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F2"
          hz="87.307"
          index="20"
          @click="play(20)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G2"
          hz="97.999"
          index="22"
          @click="play(22)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A2"
          hz="110"
          index="24"
          @click="play(24)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B2"
          hz="123.471"
          index="26"
          @click="play(26)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C3"
          hz="130.813"
          index="27"
          @click="play(27)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D3"
          hz="146.832"
          index="29"
          @click="play(29)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E3"
          hz="164.814"
          index="31"
          @click="play(31)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F3"
          hz="174.614"
          index="32"
          @click="play(32)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G3"
          hz="195.998"
          index="34"
          @click="play(34)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A3"
          hz="220"
          index="36"
          @click="play(36)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B3"
          hz="246.942"
          index="38"
          @click="play(38)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C4"
          hz="261.626"
          index="39"
          @click="play(39)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D4"
          hz="293.665"
          index="41"
          @click="play(41)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E4"
          hz="329.628"
          index="43"
          @click="play(43)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F4"
          hz="349.228"
          index="44"
          @click="play(44)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G4"
          hz="391.995"
          index="46"
          @click="play(46)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A4"
          hz="440"
          index="48"
          @click="play(48)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B4"
          hz="493.883"
          index="50"
          @click="play(50)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C5"
          hz="523.251"
          index="51"
          @click="play(51)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D5"
          hz="587.330"
          index="53"
          @click="play(53)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E5"
          hz="659.255"
          index="54"
          @click="play(54)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F5"
          hz="698.456"
          index="56"
          @click="play(56)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G5"
          hz="783.991"
          index="58"
          @click="play(58)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A5"
          hz="880"
          index="60"
          @click="play(60)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B5"
          hz="987.767"
          index="62"
          @click="play(62)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C6"
          hz="1046.502"
          index="63"
          @click="play(63)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D6"
          hz="1174.659"
          index="65"
          @click="play(65)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E6"
          hz="1318.510"
          index="67"
          @click="play(67)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F6"
          hz="1396.913"
          index="68"
          @click="play(68)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G6"
          hz="1567.982"
          index="70"
          @click="play(70)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A6"
          hz="1760"
          index="72"
          @click="play(72)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B6"
          hz="1975.533"
          index="74"
          @click="play(74)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C7"
          hz="2093.005"
          index="75"
          @click="play(75)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D7"
          hz="2349.318"
          index="77"
          @click="play(77)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E7"
          hz="2637.020"
          index="79"
          @click="play(79)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F7"
          hz="2793.826"
          index="80"
          @click="play(80)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G7"
          hz="3135.963"
          index="82"
          @click="play(82)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A7"
          hz="3520"
          index="84"
          @click="play(84)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B7"
          hz="3951.066"
          index="86"
          @click="play(86)"
        ></button>
        <button
          name="key"
          class="key-white"
          data-key="C8"
          hz="4186.009"
          index="87"
          @click="play(87)"
        ></button>
      </div>
      <div class="keys-black">
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="29.135" index="1" @click="play(1)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="34.648" index="4" @click="play(4)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="38.891" index="6" @click="play(6)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="46.249" index="9" @click="play(9)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="51.913" index="11" @click="play(11)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="58.270" index="13" @click="play(13)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="59.296" index="16" @click="play(16)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="77.782" index="18" @click="play(18)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="92.499" index="21" @click="play(21)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="97.999" index="23" @click="play(23)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="116.541" index="25" @click="play(25)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="138.591" index="28" @click="play(28)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="155.563" index="30" @click="play(30)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="184.997" index="33" @click="play(33)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="207.652" index="35" @click="play(35)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="233.082" index="37" @click="play(37)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="277.183" index="40" @click="play(40)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="311.127" index="42" @click="play(42)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="369.994" index="45" @click="play(45)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="415.305" index="47" @click="play(47)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="466.164" index="49" @click="play(49)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="554.365" index="52" @click="play(52)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="622.254" index="54" @click="play(54)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="739.989" index="57" @click="play(57)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="830.609" index="59" @click="play(59)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="932.328" index="61" @click="play(61)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="1108.731"
            index="64"
            @click="play(64)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="1244.508"
            index="66"
            @click="play(66)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="1479.978"
            index="69"
            @click="play(69)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="1661.219"
            index="71"
            @click="play(71)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="1864.655"
            index="73"
            @click="play(73)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="2217.461"
            index="76"
            @click="play(76)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="2489.016"
            index="78"
            @click="play(78)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="2959.955"
            index="81"
            @click="play(81)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="3322.438"
            index="83"
            @click="play(83)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="3729.310"
            index="85"
            @click="play(85)"
          ></button>
        </div>
        <div class="key-black"></div>
      </div>
    </div>

    <div class="simulation-piano">
      <button disabled class="simulation-piano-key piano-key-ESC">ESC</button>
      <button class="simulation-piano-key" style="margin-left: 56px">K+</button>
      <button class="simulation-piano-key piano-key-F2">K-</button>
      <button class="simulation-piano-key piano-key-F3">&nbsp;</button>
      <button class="simulation-piano-key piano-key-F4">&nbsp;</button>
    </div>
  </div>
</template>

<script>
import { getpianoNotes } from "config/gameData";
export default {
  data() {
    return {
      initDone: false,
      notes: [],
      signature: 0,
      signatureList: [
        { name: "C", value: 0 },
        { name: "Db", value: 1 },
        { name: "D", value: 2 },
        { name: "Eb", value: 3 },
        { name: "E", value: 4 },
        { name: "F", value: 6 },
        { name: "F#", value: 7 },
        { name: "G", value: -3 },
        { name: "A", value: -2 },
        { name: "A#", value: -1 },
      ],
    };
  },
  mounted() {
    let _vm = this;
    getpianoNotes().then((res) => {
      res.forEach((e) => {
        _vm.notes.push(`data:audio/mpeg;base64,${e}`);
      });
    });
    // 监控键盘
    window.onkeydown = (e) => {
      this.playNote(e.keyCode);
    };
  },
  methods: {
    keySignatureChange() {
      // 变更调号
    },
    play(index) {
      // C调的序号，需要调号转换。
      var audio = new Audio(this.notes[index + this.signature]);
      audio.play();
    },
    playNote(keyCode) {
      console.log(keyCode);
      switch (keyCode) {
        // a-l
        case 65:
          this.play(39);
          break;
        case 83:
          this.play(41);
          break;
        case 68:
          this.play(43);
          break;
        case 70:
          this.play(44);
          break;
        case 71:
          this.play(46);
          break;
        case 72:
          this.play(48);
          break;
        case 74:
          this.play(50);
          break;
        case 75:
        case 81:
          this.play(51);
          break;
        case 76:
        case 87:
          this.play(53);
          break;
        case 186:
        case 69:
          this.play(55);
          break;
        case 222:
        case 82:
          this.play(56);
          break;
      }
    },
  },
  destroyed() {
    // 注销事件
    window.onkeydown = null;
  },
};
</script>

<style lang="stylus" scoped>
.piano {
  height: 100px;
  width: 100%;
  min-width: 1144px;
  position: relative;
}

.keys-white, .keys-black {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.keys-white {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5) inset;
}

.key-white {
  height: 100%;
  width: calc((100% / 52));
  border: 1px solid #666;
  float: left;
  border-bottom: 2px solid #929292;
  position: relative;
  margin-right: 0px;
  padding: 0;
}

.key-c::after {
  content: attr(data-key);
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.key-black {
  width: calc((100% / 52));
  height: 60px;
  float: left;
}

.key-black button {
  background: black;
  transform: translateX(-50%);
  box-shadow: 0px -2px 2px rgba(255, 255, 255, 0.5) inset, 1px -8px 8px rgba(255, 255, 255, 0.5) inset;
  -moz-box-shadow: 0px -2px 2px rgba(255, 255, 255, 0.5) inset, 1px -8px 5px rgba(255, 255, 255, 0.5) inset;
  border-bottom: 1px solid #929292;
  border-top: 0;
  border-left: 1px solid #555;
  border-right: 1px solid #555;
  height: 100%;
  width: 70%;
  margin-right: 0px;
  padding: 0;
}

.note-fall-container {
  height: 200px;
  background: #002b36;
  filter: blur(20px);
}

.simulation-piano {
  background-image: url('http://47.97.248.244/static/images/simulation-piano-bg.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  height: 382px;
  padding: 36px 25px 27px 25px;
}

.simulation-piano-key {
  width: 50px;
  height: 46px;
  display: inline-block;
  background-color: #d7d8dc;
  box-shadow: 0 0 6px black;
  font-weight: bolder;
  margin-right: 2px;
  padding: 0;
  text-align: center;
  border-radius: 5px;
  color: #545454;
  font-size: 16px;
  line-height: 46px;
}

.simulation-piano-key[disabled] {
  background-color: #afb0b4;
}

.piano-key-ESC {
  width;
}
</style>