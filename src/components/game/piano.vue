<template>
  <div style="overflow-x: hidden" v-show="notes.length > 0">
    <div style="line-height: 46px; margin: 0 15px">
      <span>歌曲：</span>
      <select v-model="currentSongJsonFile" @change="changeSongJson">
        <option v-for="o in songList" :value="o.jsonFileName">
          {{ o.name }}
        </option>
      </select>
      <span v-if="bpm > 0">曲速：{{ bpm }}</span>
    </div>
    <div
      class="note-fall-container"
      v-bind:style="{ paddingBottom: bpm + `px` }"
    >
      <div
        class="note-fall-div"
        :style="{ height: `${(totalBeat + 1) * 96}px` }"
      >
        <div v-for="n in songFall" :style="calcStyle(n)">
          {{ n.noteIndex }}
        </div>
      </div>
    </div>
    <!--钢琴键88个-->
    <div class="piano">
      <div class="keys-white">
        <button
          name="key"
          class="key-white"
          hz="27.5"
          index="0"
          @mousedown="play(0)"
        ></button>
        <button
          name="key"
          class="key-white"
          hz="30.868"
          index="2"
          @mousedown="play(2)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C1"
          hz="32.703"
          index="3"
          @mousedown="play(3)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D1"
          hz="36.708"
          index="5"
          @mousedown="play(5)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E1"
          hz="41.203"
          index="7"
          @mousedown="play(7)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F1"
          hz="43.654"
          index="8"
          @mousedown="play(8)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G1"
          hz="48.999"
          index="10"
          @mousedown="play(10)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A1"
          hz="550"
          index="12"
          @mousedown="play(12)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B1"
          hz="61.735"
          index="14"
          @mousedown="play(14)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C2"
          hz="65.406"
          index="15"
          @mousedown="play(15)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D2"
          hz="73.416"
          index="17"
          @mousedown="play(17)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E2"
          hz="82.407"
          index="19"
          @mousedown="play(19)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F2"
          hz="87.307"
          index="20"
          @mousedown="play(20)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G2"
          hz="97.999"
          index="22"
          @mousedown="play(22)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A2"
          hz="110"
          index="24"
          @mousedown="play(24)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B2"
          hz="123.471"
          index="26"
          @mousedown="play(26)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C3"
          hz="130.813"
          index="27"
          @mousedown="play(27)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D3"
          hz="146.832"
          index="29"
          @mousedown="play(29)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E3"
          hz="164.814"
          index="31"
          @mousedown="play(31)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F3"
          hz="174.614"
          index="32"
          @mousedown="play(32)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G3"
          hz="195.998"
          index="34"
          @mousedown="play(34)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A3"
          hz="220"
          index="36"
          @mousedown="play(36)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B3"
          hz="246.942"
          index="38"
          @mousedown="play(38)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C4"
          hz="261.626"
          index="39"
          @mousedown="play(39)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D4"
          hz="293.665"
          index="41"
          @mousedown="play(41)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E4"
          hz="329.628"
          index="43"
          @mousedown="play(43)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F4"
          hz="349.228"
          index="44"
          @mousedown="play(44)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G4"
          hz="391.995"
          index="46"
          @mousedown="play(46)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A4"
          hz="440"
          index="48"
          @mousedown="play(48)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B4"
          hz="493.883"
          index="50"
          @mousedown="play(50)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C5"
          hz="523.251"
          index="51"
          @mousedown="play(51)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D5"
          hz="587.330"
          index="53"
          @mousedown="play(53)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E5"
          hz="659.255"
          index="55"
          @mousedown="play(55)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F5"
          hz="698.456"
          index="56"
          @mousedown="play(56)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G5"
          hz="783.991"
          index="58"
          @mousedown="play(58)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A5"
          hz="880"
          index="60"
          @mousedown="play(60)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B5"
          hz="987.767"
          index="62"
          @mousedown="play(62)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C6"
          hz="1046.502"
          index="63"
          @mousedown="play(63)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D6"
          hz="1174.659"
          index="65"
          @mousedown="play(65)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E6"
          hz="1318.510"
          index="67"
          @mousedown="play(67)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F6"
          hz="1396.913"
          index="68"
          @mousedown="play(68)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G6"
          hz="1567.982"
          index="70"
          @mousedown="play(70)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A6"
          hz="1760"
          index="72"
          @mousedown="play(72)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B6"
          hz="1975.533"
          index="74"
          @mousedown="play(74)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="C7"
          hz="2093.005"
          index="75"
          @mousedown="play(75)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="D7"
          hz="2349.318"
          index="77"
          @mousedown="play(77)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="E7"
          hz="2637.020"
          index="79"
          @mousedown="play(79)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="F7"
          hz="2793.826"
          index="80"
          @mousedown="play(80)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="G7"
          hz="3135.963"
          index="82"
          @mousedown="play(82)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="A7"
          hz="3520"
          index="84"
          @mousedown="play(84)"
        ></button>
        <button
          name="key"
          class="key-white key-c"
          data-key="B7"
          hz="3951.066"
          index="86"
          @mousedown="play(86)"
        ></button>
        <button
          name="key"
          class="key-white"
          data-key="C8"
          hz="4186.009"
          index="87"
          @mousedown="play(87)"
        ></button>
      </div>
      <div class="keys-black">
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="29.135"
            index="1"
            @mousedown="play(1)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="34.648"
            index="4"
            @mousedown="play(4)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="38.891"
            index="6"
            @mousedown="play(6)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="46.249"
            index="9"
            @mousedown="play(9)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="51.913"
            index="11"
            @mousedown="play(11)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="58.270"
            index="13"
            @mousedown="play(13)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="59.296"
            index="16"
            @mousedown="play(16)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="77.782"
            index="18"
            @mousedown="play(18)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="92.499"
            index="21"
            @mousedown="play(21)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="97.999"
            index="23"
            @mousedown="play(23)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="116.541"
            index="25"
            @mousedown="play(25)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="138.591"
            index="28"
            @mousedown="play(28)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="155.563"
            index="30"
            @mousedown="play(30)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="184.997"
            index="33"
            @mousedown="play(33)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="207.652"
            index="35"
            @mousedown="play(35)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="233.082"
            index="37"
            @mousedown="play(37)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="277.183"
            index="40"
            @mousedown="play(40)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="311.127"
            index="42"
            @mousedown="play(42)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="369.994"
            index="45"
            @mousedown="play(45)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="415.305"
            index="47"
            @mousedown="play(47)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="466.164"
            index="49"
            @mousedown="play(49)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="554.365"
            index="52"
            @mousedown="play(52)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="622.254"
            index="54"
            @mousedown="play(54)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="739.989"
            index="57"
            @mousedown="play(57)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="830.609"
            index="59"
            @mousedown="play(59)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="932.328"
            index="61"
            @mousedown="play(61)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="1108.731"
            index="64"
            @mousedown="play(64)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="1244.508"
            index="66"
            @mousedown="play(66)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="1479.978"
            index="69"
            @mousedown="play(69)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="1661.219"
            index="71"
            @mousedown="play(71)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="1864.655"
            index="73"
            @mousedown="play(73)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="2217.461"
            index="76"
            @mousedown="play(76)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="2489.016"
            index="78"
            @mousedown="play(78)"
          ></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button
            name="key"
            hz="2959.955"
            index="81"
            @mousedown="play(81)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="3322.438"
            index="83"
            @mousedown="play(83)"
          ></button>
        </div>
        <div class="key-black">
          <button
            name="key"
            hz="3729.310"
            index="85"
            @mousedown="play(85)"
          ></button>
        </div>
        <div class="key-black"></div>
      </div>
    </div>

    <div class="simulation-piano">
      <div class="simulation-piano-line">
        <button
          disabled
          class="simulation-piano-key piano-key-disable piano-key-ESC"
          id="piano-key-27"
        >
          ESC
        </button>
        <button
          class="simulation-piano-key"
          style="margin-left: 56px"
          id="piano-key-112"
        >
          K+
        </button>
        <button class="simulation-piano-key piano-key-F2" id="piano-key-113">
          K-
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F3"
          id="piano-key-114"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F4"
          id="piano-key-115"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F5"
          id="piano-key-116"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F6"
          id="piano-key-117"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F7"
          id="piano-key-118"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F8"
          id="piano-key-119"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F9"
          id="piano-key-120"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F10"
          id="piano-key-121"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F11"
          id="piano-key-122"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-F12"
          id="piano-key-123"
        >
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-mid-left piano-key-PrintScreen"
          id="piano-key-42"
        >
          &nbsp;
        </button>
        <button class="simulation-piano-key piano-key-right piano-key-Lock">
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-Pause"
          id="piano-key-19"
        >
          &nbsp;
        </button>
        <div style="float: right; line-height: 46px">
          <span>调号</span>
          <select v-model="signature">
            <option v-for="o in signatureList" :value="o.value">
              {{ o.name }}
            </option>
          </select>
        </div>
      </div>
      <div
        class="simulation-piano-line"
        style="margin-top: 14px; width: 1286px"
      >
        <button
          disabled
          class="simulation-piano-key piano-key-wave"
          id="piano-key-192"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-1 note-up-1"
          id="piano-key-49"
          @mousedown="keyboardplay(51, 49)"
          @mouseout="keyboardstop(49)"
          @mouseup="keyboardstop(49)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-2 note-up-1"
          id="piano-key-50"
          @mousedown="keyboardplay(53, 50)"
          @mouseout="keyboardstop(50)"
          @mouseup="keyboardstop(50)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-3 note-up-1"
          id="piano-key-51"
          @mousedown="keyboardplay(55, 51)"
          @mouseout="keyboardstop(51)"
          @mouseup="keyboardstop(51)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-4 note-up-1"
          id="piano-key-52"
          @mousedown="keyboardplay(56, 52)"
          @mouseout="keyboardstop(52)"
          @mouseup="keyboardstop(52)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-5 note-up-1"
          id="piano-key-53"
          @mousedown="keyboardplay(58, 53)"
          @mouseout="keyboardstop(53)"
          @mouseup="keyboardstop(53)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-6 note-up-1"
          id="piano-key-54"
          @mousedown="keyboardplay(60, 54)"
          @mouseout="keyboardstop(54)"
          @mouseup="keyboardstop(54)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-7 note-up-1"
          id="piano-key-55"
          @mousedown="keyboardplay(62, 55)"
          @mouseout="keyboardstop(55)"
          @mouseup="keyboardstop(55)"
        >
          7
        </button>
        <button
          class="simulation-piano-key piano-key-8 note-up-2"
          id="piano-key-56"
          @mousedown="keyboardplay(63, 56)"
          @mouseout="keyboardstop(56)"
          @mouseup="keyboardstop(56)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-9 note-up-2"
          id="piano-key-57"
          @mousedown="keyboardplay(65, 57)"
          @mouseout="keyboardstop(57)"
          @mouseup="keyboardstop(57)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-0 note-up-2"
          id="piano-key-48"
          @mousedown="keyboardplay(67, 48)"
          @mouseout="keyboardstop(48)"
          @mouseup="keyboardstop(48)"
        >
          3
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-minus"
          id="piano-key-189"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-equal"
          id="piano-key-187"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-backspace"
          id="piano-key-8"
        >
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-mid-left piano-key-insert note-up-2"
          id="piano-key-45"
          @mousedown="keyboardplay(68, 45, false)"
          @mouseout="keyboardstop(45)"
          @mouseup="keyboardstop(45)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-home note-up-2"
          id="piano-key-36"
          @mousedown="keyboardplay(70, 36, false)"
          @mouseout="keyboardstop(36)"
          @mouseup="keyboardstop(36)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-pageup note-up-2"
          id="piano-key-33"
          @mousedown="keyboardplay(72, 33, false)"
          @mouseout="keyboardstop(33)"
          @mouseup="keyboardstop(33)"
        >
          6
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-numlock note-up-1"
          id="piano-key-144"
          @mousedown="keyboardplay(56, 144, false)"
          @mouseout="keyboardstop(144)"
          @mouseup="keyboardstop(144)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-divide note-up-1"
          id="piano-key-111"
          @mousedown="keyboardplay(58, 111, false)"
          @mouseout="keyboardstop(111)"
          @mouseup="keyboardstop(111)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-multiply note-up-1"
          id="piano-key-106"
          @mousedown="keyboardplay(60, 106, false)"
          @mouseout="keyboardstop(106)"
          @mouseup="keyboardstop(106)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-subtract note-up-1"
          id="piano-key-109"
          @mousedown="keyboardplay(62, 109, false)"
          @mouseout="keyboardstop(109)"
          @mouseup="keyboardstop(109)"
        >
          7
        </button>
      </div>
      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top; width: 1229px"
      >
        <button
          disabled
          class="simulation-piano-key piano-key-tab"
          id="piano-key-9"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-q"
          id="piano-key-81"
          @mousedown="keyboardplay(39, 81)"
          @mouseout="keyboardstop(81)"
          @mouseup="keyboardstop(81)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-w"
          id="piano-key-87"
          @mousedown="keyboardplay(41, 87)"
          @mouseout="keyboardstop(87)"
          @mouseup="keyboardstop(87)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-e"
          id="piano-key-69"
          @mousedown="keyboardplay(43, 69)"
          @mouseout="keyboardstop(69)"
          @mouseup="keyboardstop(69)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-r"
          id="piano-key-82"
          @mousedown="keyboardplay(44, 82)"
          @mouseout="keyboardstop(82)"
          @mouseup="keyboardstop(82)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-t"
          id="piano-key-84"
          @mousedown="keyboardplay(46, 84)"
          @mouseout="keyboardstop(84)"
          @mouseup="keyboardstop(84)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-y"
          id="piano-key-89"
          @mousedown="keyboardplay(48, 89)"
          @mouseout="keyboardstop(89)"
          @mouseup="keyboardstop(89)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-u"
          id="piano-key-85"
          @mousedown="keyboardplay(50, 85)"
          @mouseout="keyboardstop(85)"
          @mouseup="keyboardstop(85)"
        >
          7
        </button>
        <button
          class="simulation-piano-key piano-key-i note-up-1"
          id="piano-key-73"
          @mousedown="keyboardplay(51, 73)"
          @mouseout="keyboardstop(73)"
          @mouseup="keyboardstop(73)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-o note-up-1"
          id="piano-key-79"
          @mousedown="keyboardplay(53, 79)"
          @mouseout="keyboardstop(79)"
          @mouseup="keyboardstop(79)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-p note-up-1"
          id="piano-key-80"
          @mousedown="keyboardplay(55, 80)"
          @mouseout="keyboardstop(80)"
          @mouseup="keyboardstop(80)"
        >
          3
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-brackets-left"
          id="piano-key-219"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-brackets-right"
          id="piano-key-221"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-seprator"
          id="piano-key-220"
        >
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-mid-left piano-key-delete note-up-2"
          id="piano-key-46"
          @mousedown="keyboardplay(63, 46, false)"
          @mouseout="keyboardstop(46)"
          @mouseup="keyboardstop(46)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-end note-up-2"
          id="piano-key-35"
          @mousedown="keyboardplay(65, 35, false)"
          @mouseout="keyboardstop(35)"
          @mouseup="keyboardstop(35)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-pagedown note-up-2"
          id="piano-key-34"
          @mousedown="keyboardplay(67, 34, false)"
          @mouseout="keyboardstop(34)"
          @mouseup="keyboardstop(34)"
        >
          3
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-num7"
          id="piano-key-103"
          @mousedown="keyboardplay(50, 103, false)"
          @mouseout="keyboardstop(103)"
          @mouseup="keyboardstop(103)"
        >
          7
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num8 note-up-1"
          id="piano-key-104"
          @mousedown="keyboardplay(51, 104, false)"
          @mouseout="keyboardstop(104)"
          @mouseup="keyboardstop(104)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num9 note-up-1"
          id="piano-key-105"
          @mousedown="keyboardplay(53, 105, false)"
          @mouseout="keyboardstop(105)"
          @mouseup="keyboardstop(105)"
        >
          2
        </button>
      </div>

      <div
        class="simulation-piano-block"
        style="margin-top: 7px; vertical-align: top"
      >
        <button
          class="simulation-piano-key piano-key-right piano-key-num-plus note-up-1"
          id="piano-key-107"
          @mousedown="keyboardplay(55, 107, false)"
          @mouseout="keyboardstop(107)"
          @mouseup="keyboardstop(107)"
        >
          3
        </button>
      </div>

      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top; width: 1229px"
      >
        <button
          disabled
          class="simulation-piano-key piano-key-caps"
          id="piano-key-20"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-a note-under-1"
          id="piano-key-65"
          @mousedown="keyboardplay(27, 65)"
          @mouseout="keyboardstop(65)"
          @mouseup="keyboardstop(65)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-s note-under-1"
          id="piano-key-83"
          @mousedown="keyboardplay(29, 83)"
          @mouseout="keyboardstop(83)"
          @mouseup="keyboardstop(83)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-d note-under-1"
          id="piano-key-68"
          @mousedown="keyboardplay(31, 68)"
          @mouseout="keyboardstop(68)"
          @mouseup="keyboardstop(68)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-f note-under-1"
          id="piano-key-70"
          @mousedown="keyboardplay(32, 70)"
          @mouseout="keyboardstop(70)"
          @mouseup="keyboardstop(70)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-g note-under-1"
          id="piano-key-71"
          @mousedown="keyboardplay(34, 71)"
          @mouseout="keyboardstop(71)"
          @mouseup="keyboardstop(71)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-h note-under-1"
          id="piano-key-72"
          @mousedown="keyboardplay(36, 72)"
          @mouseout="keyboardstop(72)"
          @mouseup="keyboardstop(72)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-j note-under-1"
          id="piano-key-74"
          @mousedown="keyboardplay(38, 74)"
          @mouseout="keyboardstop(74)"
          @mouseup="keyboardstop(74)"
        >
          7
        </button>
        <button
          class="simulation-piano-key piano-key-k"
          id="piano-key-75"
          @mousedown="keyboardplay(39, 75)"
          @mouseout="keyboardstop(75)"
          @mouseup="keyboardstop(75)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-l"
          id="piano-key-76"
          @mousedown="keyboardplay(41, 76)"
          @mouseout="keyboardstop(76)"
          @mouseup="keyboardstop(76)"
        >
          2
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-colon"
          id="piano-key-186"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-quota"
          id="piano-key-222"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-enter"
          id="piano-key-13"
        >
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-mid-left piano-key-invisible"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-invisible"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-invisible"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num4"
          id="piano-key-100"
          @mousedown="keyboardplay(44, 100, false)"
          @mouseout="keyboardstop(100)"
          @mouseup="keyboardstop(100)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num5"
          id="piano-key-101"
          @mousedown="keyboardplay(46, 101, false)"
          @mouseout="keyboardstop(101)"
          @mouseup="keyboardstop(101)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num6"
          id="piano-key-102"
          @mousedown="keyboardplay(48, 102, false)"
          @mouseout="keyboardstop(102)"
          @mouseup="keyboardstop(102)"
        >
          6
        </button>
      </div>

      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top; width: 1229px"
      >
        <button
          disabled
          class="simulation-piano-key piano-key-left-shift"
          id="piano-key-16"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-z note-under-2"
          id="piano-key-90"
          @mousedown="keyboardplay(15, 90)"
          @mouseout="keyboardstop(90)"
          @mouseup="keyboardstop(90)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-x note-under-2"
          id="piano-key-88"
          @mousedown="keyboardplay(17, 88)"
          @mouseout="keyboardstop(88)"
          @mouseup="keyboardstop(88)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-c note-under-2"
          id="piano-key-67"
          @mousedown="keyboardplay(19, 67)"
          @mouseout="keyboardstop(67)"
          @mouseup="keyboardstop(67)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-v note-under-2"
          id="piano-key-86"
          @mousedown="keyboardplay(20, 86)"
          @mouseout="keyboardstop(86)"
          @mouseup="keyboardstop(86)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-b note-under-2"
          id="piano-key-66"
          @mousedown="keyboardplay(22, 66)"
          @mouseout="keyboardstop(66)"
          @mouseup="keyboardstop(66)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-n note-under-2"
          id="piano-key-78"
          @mousedown="keyboardplay(24, 78)"
          @mouseout="keyboardstop(78)"
          @mouseup="keyboardstop(78)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-m note-under-2"
          id="piano-key-77"
          @mousedown="keyboardplay(26, 77)"
          @mouseout="keyboardstop(77)"
          @mouseup="keyboardstop(77)"
        >
          7
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-comma"
          id="piano-key-188"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-period"
          id="piano-key-190"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-ques"
          id="piano-key-191"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-right-shift"
          id="piano-key-16"
        >
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-mid-left piano-key-invisible"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-arrow-up note-under-1"
          id="piano-key-38"
          @mousedown="keyboardplay(32, 38, false)"
          @mouseout="keyboardstop(38)"
          @mouseup="keyboardstop(38)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-invisible"
        >
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-num1"
          id="piano-key-97"
          @mousedown="keyboardplay(39, 97, false)"
          @mouseout="keyboardstop(97)"
          @mouseup="keyboardstop(97)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num2"
          id="piano-key-98"
          @mousedown="keyboardplay(41, 98, false)"
          @mouseout="keyboardstop(98)"
          @mouseup="keyboardstop(98)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num3"
          id="piano-key-99"
          @mousedown="keyboardplay(43, 99, false)"
          @mouseout="keyboardstop(99)"
          @mouseup="keyboardstop(99)"
        >
          3
        </button>
      </div>
      <div
        class="simulation-piano-block"
        style="margin-top: 7px; vertical-align: top"
      >
        <button
          class="simulation-piano-key piano-key-right piano-key-num-enter note-under-1"
          id="piano-key-108"
          @mousedown="keyboardplay(38, 108, false)"
          @mouseout="keyboardstop(108)"
          @mouseup="keyboardstop(108)"
        >
          7
        </button>
      </div>
      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top; width: 1229px"
      >
        <button
          disabled
          class="simulation-piano-key piano-key-left-ctrl"
          id="piano-key-17"
        >
          &nbsp;
        </button>
        <button disabled class="simulation-piano-key piano-key-win">
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-left-alt"
          id="piano-key-18"
        >
          &nbsp;
        </button>
        <button
          disabled
          class="simulation-piano-key piano-key-space"
          id="piano-key-32"
        >
          &nbsp;
        </button>
        <button disabled class="simulation-piano-key piano-key-right-alt">
          &nbsp;
        </button>
        <button disabled class="simulation-piano-key piano-key-app">
          &nbsp;
        </button>
        <button disabled class="simulation-piano-key piano-key-right-ctrl">
          &nbsp;
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-mid-left piano-key-arrow-left note-under-1"
          id="piano-key-37"
          @mousedown="keyboardplay(27, 37, false)"
          @mouseout="keyboardstop(37)"
          @mouseup="keyboardstop(37)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-arrow-down note-under-1"
          id="piano-key-40"
          @mousedown="keyboardplay(29, 40, false)"
          @mouseout="keyboardstop(40)"
          @mouseup="keyboardstop(40)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-arrow-right note-under-1"
          id="piano-key-39"
          @mousedown="keyboardplay(31, 39, false)"
          @mouseout="keyboardstop(39)"
          @mouseup="keyboardstop(39)"
        >
          3
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-num0 note-under-1"
          id="piano-key-96"
          @mousedown="keyboardplay(34, 96, false)"
          @mouseout="keyboardstop(96)"
          @mouseup="keyboardstop(96)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-dot note-under-1"
          id="piano-key-110"
          @mousedown="keyboardplay(36, 110, false)"
          @mouseout="keyboardstop(110)"
          @mouseup="keyboardstop(110)"
        >
          6
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getpianoNotes,
  getPianoSongFallList,
  getSongNoteFall,
} from "config/gameData";
import jQuery from "jquery";
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
      pressedKey: [],
      songList: [],
      currentSongJsonFile: "",
      songFall: [],
      // 每分钟节拍数
      bpm: 0,
      totalBeat: 0
    };
  },
  mounted() {
    let _vm = this;
    getpianoNotes().then((res) => {
      res.forEach((e) => {
        _vm.notes.push(`data:audio/mpeg;base64,${e}`);
      });
    });
    getPianoSongFallList().then((res) => {
      res.forEach((e) => {
        _vm.songList.push(e);
      });
    });
    // 监控键盘
    window.onkeydown = (e) => {
      if (_vm.pressedKey.includes(e.keyCode)) {
        return;
      }
      _vm.pressedKey.push(e.keyCode);
      document.getElementById("piano-key-" + e.keyCode).classList.add("active");
      _vm.playNote(e.keyCode);
      e.preventDefault();
    };
    window.onkeyup = (e) => {
      document
        .getElementById("piano-key-" + e.keyCode)
        .classList.remove("active");
      _vm.pressedKey.splice(_vm.pressedKey.indexOf(e.keyCode), 1);
      _vm.playNote(e.keyCode, false);
    };
    // 琴键鼠标点击
    jQuery("button[name='key']")
      .on("mousedown", function () {
        jQuery(this).addClass("active-left");
      })
      .on("mouseup", function () {
        jQuery(this).removeClass("active-right").removeClass("active-left");
      })
      .on("mouseout", function () {
        jQuery(this).removeClass("active-right").removeClass("active-left");
      });
    // 模拟键盘鼠标点击
  },
  methods: {
    changeSongJson() {
      let _vm = this;
      // 读json,生成fall
      getSongNoteFall(this.currentSongJsonFile).then((res) => {
        _vm.songFall = res.notes;
        _vm.signature = res.signature;
        _vm.bpm = res.bpm;
        _vm.totalBeat = 0;
        var leftBottom = 0,
          rightBottom = 0;
        res.notes.forEach((x) => {
          _vm.totalBeat += x.beat;
          if (x.isRight) {
            rightBottom += x.beat * 96;
            x.bottom = rightBottom;
          } else {
            leftBottom += x.beat * 96;
            x.bottom = leftBottom;
          }
        });
        // 每分钟下落 bmp * 96px
        // 下落时间
        var fallTime = totalBeat / _vm.bpm;

        // jQuery('.note-fall-div').animate()
      });
    },
    keySignatureChange() {
      // 变更调号
    },
    play(index, play = true, isLeft = true) {
      if (play) {
        // C调的序号,需要调号转换。
        var audio = new Audio(this.notes[index]);
        audio.play();
        jQuery(`button[index=${index}]`).addClass(
          isLeft ? "active-left" : "active-right"
        );
      } else {
        jQuery(`button[index=${index}]`)
          .removeClass("active-right")
          .removeClass("active-left");
      }
    },
    keyboardplay(noteIndex, keyCode, isLeft) {
      this.play(noteIndex + this.signature, true, isLeft);
      jQuery(`#piano-key-${keyCode}`).addClass("active");
    },
    keyboardstop(keyCode) {
      jQuery(`#piano-key-${keyCode}`).removeClass("active");
      // 模拟键盘的鼠标点击不会一次点两个的情况
      jQuery(`.piano button`)
        .removeClass("active-left")
        .removeClass("active-right");
    },
    calcStyle(n) {
      var keyElement = jQuery(`button[index=${n.noteIndex}]`)[0];
      var result = {
        position: "absolute",
        width: keyElement.clientWidth,
        height: `${n.beat * 96}px`,
        left: `${keyElement.offsetLeft}px`,
        bottom: `${n.bottom}px`,
        background: n.isRight ? "#8dc221" : "#48a9e2",
        lineHeight: `${n.beat * 96}px`,
      };
      if (n.rest) {
        result.visibility = "hidden";
      }
      return result;
    },
    playNote(keyCode, play = true, isLeft = true) {
      switch (keyCode) {
        //z-m
        case 90:
          this.play(15 + this.signature, play, isLeft);
          break;
        case 88:
          this.play(17 + this.signature, play, isLeft);
          break;
        case 67:
          this.play(19 + this.signature, play, isLeft);
          break;
        case 86:
          this.play(20 + this.signature, play, isLeft);
          break;
        case 66:
          this.play(22 + this.signature, play, isLeft);
          break;
        case 78:
          this.play(24 + this.signature, play, isLeft);
          break;
        case 77:
          this.play(26 + this.signature, play, isLeft);
          break;
        // a-l
        case 65:
          this.play(27 + this.signature, play, isLeft);
          break;
        case 83:
          this.play(29 + this.signature, play, isLeft);
          break;
        case 68:
          this.play(31 + this.signature, play, isLeft);
          break;
        case 70:
          this.play(32 + this.signature, play, isLeft);
          break;
        case 71:
          this.play(34 + this.signature, play, isLeft);
          break;
        case 72:
          this.play(36 + this.signature, play, isLeft);
          break;
        case 74:
          this.play(38 + this.signature, play, isLeft);
          break;
        case 75:
        case 81:
          this.play(39 + this.signature, play, isLeft);
          break;
        case 76:
        case 87:
          this.play(41 + this.signature, play, isLeft);
          break;
        case 186:
        case 69:
          this.play(43 + this.signature, play, isLeft);
          break;
        case 222:
        case 82:
          this.play(44 + this.signature, play, isLeft);
          break;
        // t-p
        case 84:
          this.play(46 + this.signature, play, isLeft);
          break;
        case 89:
          this.play(48 + this.signature, play, isLeft);
          break;
        case 85:
          this.play(50 + this.signature, play, isLeft);
          break;
        case 73:
        case 49:
          this.play(51 + this.signature, play, isLeft);
          break;
        case 79:
        case 50:
          this.play(53 + this.signature, play, isLeft);
          break;
        case 80:
        case 51:
          this.play(55 + this.signature, play, isLeft);
          break;
        // 4-0
        case 52:
          this.play(56 + this.signature, play, isLeft);
          break;
        case 53:
          this.play(58 + this.signature, play, isLeft);
          break;
        case 54:
          this.play(60 + this.signature, play, isLeft);
          break;
        case 55:
          this.play(62 + this.signature, play, isLeft);
          break;
        case 56:
          this.play(63 + this.signature, play, isLeft);
          break;
        case 57:
          this.play(65 + this.signature, play, isLeft);
          break;
        case 48:
          this.play(67 + this.signature, play, isLeft);
          break;
        // 右区
        case 37:
          this.play(27 + this.signature, play, false);
          break;
        case 40:
          this.play(29 + this.signature, play, false);
          break;
        case 39:
          this.play(31 + this.signature, play, false);
          break;
        case 38:
          this.play(32 + this.signature, play, false);
          break;
        case 96:
          this.play(34 + this.signature, play, false);
          break;
        case 110:
          this.play(36 + this.signature, play, false);
          break;
        case 13:
          this.play(38 + this.signature, play, false);
          break;
        case 97:
          this.play(39 + this.signature, play, false);
          break;
        case 98:
          this.play(41 + this.signature, play, false);
          break;
        case 99:
          this.play(43 + this.signature, play, false);
          break;
        case 100:
          this.play(44 + this.signature, play, false);
          break;
        case 101:
          this.play(46 + this.signature, play, false);
          break;
        case 102:
          this.play(48 + this.signature, play, false);
          break;
        case 103:
          this.play(50 + this.signature, play, false);
          break;
        case 104:
          this.play(51 + this.signature, play, false);
          break;
        case 105:
          this.play(53 + this.signature, play, false);
          break;
        case 107:
          this.play(55 + this.signature, play, false);
          break;
        case 144:
          this.play(56 + this.signature, play, false);
          break;
        case 111:
          this.play(58 + this.signature, play, false);
          break;
        case 106:
          this.play(60 + this.signature, play, false);
          break;
        case 109:
          this.play(62 + this.signature, play, false);
          break;
        case 46:
          this.play(63 + this.signature, play, false);
          break;
        case 35:
          this.play(65 + this.signature, play, false);
          break;
        case 34:
          this.play(67 + this.signature, play, false);
          break;
        case 45:
          this.play(68 + this.signature, play, false);
          break;
        case 36:
          this.play(70 + this.signature, play, false);
          break;
        case 33:
          this.play(72 + this.signature, play, false);
          break;
      }
    },
  },
  destroyed() {
    // 注销事件
    window.onkeydown = null;
    window.onkeyup = null;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.keys-white {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5) inset;
}

.keys-black {
  height: 60px;
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

.active-right {
  background-color: #48a9e2 !important;
  box-shadow: 0 4px 8px #333 inset !important;
}

.active-left {
  background-color: #8dc221 !important;
  box-shadow: 0 4px 8px #333 inset !important;
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
  height: 440px;
  background: #002b36;
  // filter: blur(20px);
  overflow: hidden;
}

.simulation-piano {
  background-image: url('http://47.97.248.244/static/images/simulation-piano-bg.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  height: 382px;
  padding: 36px 26px 27px 26px;
}

.simulation-piano-line {
  float: left;
}

.simulation-piano-block {
  float: right;
}

// 辅音区 未按
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

// 辅音区 按
.simulation-piano-key.active {
  background-color: #8dc221;
}

.simulation-piano-key[disabled] {
  background-color: #afb0b4 !important;
}

// 主音区 未按
.piano-key-right {
  background-color: #d5e1f1;
}

// 主音区 按下
.piano-key-right.active {
  background-color: #48a9e2;
}

.active {
  box-shadow: 0px 4px 8px #333 inset;
}

.piano-key-F5, .piano-key-F9 {
  margin-left: 27px;
}

.piano-key-mid-left {
  margin-left: 23px;
}

.piano-key-mid-right {
  margin-right: 23px;
}

.piano-key-num-plus, .piano-key-num-enter {
  height: 98px;
}

.piano-key-backspace {
  width: 103px;
}

.piano-key-tab {
  width: 78px;
}

.piano-key-seprator {
  width: 75px;
}

.piano-key-caps {
  width: 106px;
}

.piano-key-enter {
  width: 104px;
}

.piano-key-left-shift {
  width: 134px;
}

.piano-key-right-shift {
  width: 132px;
}

.piano-key-invisible {
  visibility: hidden;
}

.piano-key-left-ctrl, .piano-key-right-ctrl {
  width: 108px;
}

.piano-key-space {
  width: 384px;
}

.piano-key-num0 {
  width: 106px;
}

.note-under-1, .note-up-1, .note-under-2, .note-up-2 {
  position: relative;
}

.note-under-1::after {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  bottom: 10px;
  left: calc(50% - 2px);
  font-weight: bolder;
  background-color: #545454;
}

.piano-key-num-enter::after {
  bottom: 36px;
}

.note-up-1::after {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  top: 10px;
  left: calc(50% - 2px);
  font-weight: bolder;
  background-color: #545454;
}

.piano-key-num-plus::after {
  top: 36px;
}

.note-up-2::before {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  top: 5px;
  left: calc(50% - 2px);
  font-weight: bolder;
  background-color: #545454;
}

.note-up-2::after {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  top: 10px;
  left: calc(50% - 2px);
  font-weight: bolder;
  background-color: #545454;
}

.note-under-2::before {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  bottom: 5px;
  left: calc(50% - 2px);
  font-weight: bolder;
  background-color: #545454;
}

.note-under-2::after {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  bottom: 10px;
  left: calc(50% - 2px);
  font-weight: bolder;
  background-color: #545454;
}

.note-fall-div {
  position: relative;
}

.note-fall-div div{
  border: 1px solid white;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5) inset;
}

.beat-32 {
  height: 12px;
}

.beat-16 {
  height: 24px;
}

.beat-8 {
  height: 48px;
}

// 8分音符的3连音
.beat-8-3 {
  height: 16px;
}

.beat-4 {
  height: 96px;
}

// 4分音符的三连音
.beat-4-3 {
  height: 32px;
}

.beat-2 {
  height: 192px;
}

// 2分音符的三连音
.beat-2-3 {
  height: 64px;
}

.beat-1 {
  height: 284px;
}

.beat-rest {
  visibility: hidden;
}
</style>