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
          index="54"
          @mousedown="play(54)"
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
          <button name="key" hz="29.135" index="1" @mousedown="play(1)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="34.648" index="4" @mousedown="play(4)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="38.891" index="6" @mousedown="play(6)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="46.249" index="9" @mousedown="play(9)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="51.913" index="11" @mousedown="play(11)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="58.270" index="13" @mousedown="play(13)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="59.296" index="16" @mousedown="play(16)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="77.782" index="18" @mousedown="play(18)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="92.499" index="21" @mousedown="play(21)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="97.999" index="23" @mousedown="play(23)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="116.541" index="25" @mousedown="play(25)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="138.591" index="28" @mousedown="play(28)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="155.563" index="30" @mousedown="play(30)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="184.997" index="33" @mousedown="play(33)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="207.652" index="35" @mousedown="play(35)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="233.082" index="37" @mousedown="play(37)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="277.183" index="40" @mousedown="play(40)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="311.127" index="42" @mousedown="play(42)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="369.994" index="45" @mousedown="play(45)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="415.305" index="47" @mousedown="play(47)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="466.164" index="49" @mousedown="play(49)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="554.365" index="52" @mousedown="play(52)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="622.254" index="54" @mousedown="play(54)"></button>
        </div>
        <div class="key-black"></div>
        <div class="key-black">
          <button name="key" hz="739.989" index="57" @mousedown="play(57)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="830.609" index="59" @mousedown="play(59)"></button>
        </div>
        <div class="key-black">
          <button name="key" hz="932.328" index="61" @mousedown="play(61)"></button>
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
      </div>
      <div class="simulation-piano-line" style="margin-top: 14px">
        <button
          disabled
          class="simulation-piano-key piano-key-wave"
          id="piano-key-192"
        >
          &nbsp;
        </button>
        <button
          class="simulation-piano-key piano-key-1 note-up-1"
          id="piano-key-49" @mousedown="play(67)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-2 note-up-1"
          id="piano-key-50" @mousedown="play(69)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-3 note-up-1"
          id="piano-key-51" @mousedown="play(71)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-4 note-up-1"
          id="piano-key-52"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-5 note-up-1"
          id="piano-key-53"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-6 note-up-1"
          id="piano-key-54"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-7 note-up-1"
          id="piano-key-55"
        >
          7
        </button>
        <button
          class="simulation-piano-key piano-key-8 note-up-2"
          id="piano-key-56"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-9 note-up-2"
          id="piano-key-57"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-0 note-up-2"
          id="piano-key-48"
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
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-home note-up-2"
          id="piano-key-36"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-pageup note-up-2"
          id="piano-key-33"
        >
          6
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-numlock note-up-1"
          id="piano-key-144"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-divide note-up-1"
          id="piano-key-111"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-multiply note-up-1"
          id="piano-key-106"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-subtract note-up-1"
          id="piano-key-109"
        >
          7
        </button>
      </div>
      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top"
      >
        <button
          disabled
          class="simulation-piano-key piano-key-tab"
          id="piano-key-9"
        >
          &nbsp;
        </button>
        <button class="simulation-piano-key piano-key-q" id="piano-key-81" @mousedown="play(55)">
          1
        </button>
        <button class="simulation-piano-key piano-key-w" id="piano-key-87" @mousedown="play(57)">
          2
        </button>
        <button class="simulation-piano-key piano-key-e" id="piano-key-69" @mousedown="play(59)">
          3
        </button>
        <button class="simulation-piano-key piano-key-r" id="piano-key-82" @mousedown="play(60)">
          4
        </button>
        <button class="simulation-piano-key piano-key-t" id="piano-key-84" @mousedown="play(62)">
          5
        </button>
        <button class="simulation-piano-key piano-key-y" id="piano-key-89" @mousedown="play(64)">
          6
        </button>
        <button class="simulation-piano-key piano-key-u" id="piano-key-85" @mousedown="play(66)">
          7
        </button>
        <button
          class="simulation-piano-key piano-key-i note-up-1"
          id="piano-key-73" @mousedown="play(67)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-o note-up-1"
          id="piano-key-79" @mousedown="play(69)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-p note-up-1"
          id="piano-key-80" @mousedown="play(71)"
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
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-end note-up-2"
          id="piano-key-35"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-pagedown note-up-2"
          id="piano-key-34"
        >
          3
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-num7"
          id="piano-key-103"
        >
          7
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num8 note-up-1"
          id="piano-key-104"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num9 note-up-1"
          id="piano-key-105"
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
        >
          3
        </button>
      </div>

      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top"
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
          id="piano-key-65" @mousedown="play(39)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-s note-under-1"
          id="piano-key-83" @mousedown="play(41)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-d note-under-1"
          id="piano-key-68" @mousedown="play(43)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-f note-under-1"
          id="piano-key-70" @mousedown="play(44)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-g note-under-1"
          id="piano-key-71" @mousedown="play(46)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-h note-under-1"
          id="piano-key-72" @mousedown="play(48)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-j note-under-1"
          id="piano-key-74" @mousedown="play(50)"
        >
          7
        </button>
        <button class="simulation-piano-key piano-key-k" id="piano-key-75" @mousedown="play(51)">
          1
        </button>
        <button class="simulation-piano-key piano-key-l" id="piano-key-76" @mousedown="play(53)">
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
          class="simulation-piano-key piano-key-right piano-key-num4"
          id="piano-key-100"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num5"
          id="piano-key-101"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num6"
          id="piano-key-102"
        >
          6
        </button>
      </div>

      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top"
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
          id="piano-key-90" @mousedown="play(27)"
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-x note-under-2"
          id="piano-key-88" @mousedown="play(29)"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-c note-under-2"
          id="piano-key-67" @mousedown="play(31)"
        >
          3
        </button>
        <button
          class="simulation-piano-key piano-key-v note-under-2"
          id="piano-key-86" @mousedown="play(32)"
        >
          4
        </button>
        <button
          class="simulation-piano-key piano-key-b note-under-2"
          id="piano-key-66" @mousedown="play(34)"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-n note-under-2"
          id="piano-key-78" @mousedown="play(36)"
        >
          6
        </button>
        <button
          class="simulation-piano-key piano-key-m note-under-2"
          id="piano-key-77" @mousedown="play(38)"
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
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num2"
          id="piano-key-98"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-num3"
          id="piano-key-99"
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
        >
          7
        </button>
      </div>
      <div
        class="simulation-piano-line"
        style="margin-top: 7px; vertical-align: top"
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
        >
          1
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-arrow-down note-under-1"
          id="piano-key-40"
        >
          2
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-mid-right piano-key-arrow-right note-under-1"
          id="piano-key-39"
        >
          3
        </button>

        <button
          class="simulation-piano-key piano-key-right piano-key-num0 note-under-1"
          id="piano-key-96"
        >
          5
        </button>
        <button
          class="simulation-piano-key piano-key-right piano-key-dot note-under-1"
          id="piano-key-110"
        >
          6
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getpianoNotes } from "config/gameData";
import jQuery from 'jquery'
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
      console.log(e.keyCode);
      document.getElementById("piano-key-" + e.keyCode).classList.add("active");
      this.playNote(e.keyCode);
    };
    window.onkeyup = (e) => {
      document
        .getElementById("piano-key-" + e.keyCode)
        .classList.remove("active");
    };
    jQuery("button[name='key']").on('mousedown', function(){
      jQuery(this).addClass("active-left");
    }).on('mouseup', function(){
      jQuery(this).removeClass("active-left");
    }).on('mouseout', function(){
      jQuery(this).removeClass("active-left");
    })
  },
  methods: {
    keySignatureChange() {
      // 变更调号
    },
    play(index, isLeft = true) {
      // C调的序号，需要调号转换。
      var audio = new Audio(this.notes[index + this.signature]);
      audio.play();
    },
    playNote(keyCode) {
      console.log(keyCode);
      switch (keyCode) {
        //z-m
        case 90:
          this.play(27);
          break;
        case 88:
          this.play(29);
          break;
        case 67:
          this.play(31);
          break;
        case 86:
          this.play(32);
          break;
        case 66:
          this.play(34);
          break;
        case 78:
          this.play(36);
          break;
        case 77:
          this.play(38);
          break;
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
        // t-p
        case 84:
          this.play(58);
          break;
        case 89:
          this.play(60);
          break;
        case 85:
          this.play(62);
          break;
        case 73:
        case 49:
          this.play(63);
          break;
        case 79:
        case 50:
          this.play(65);
          break;
        case 80:
        case 51:
          this.play(67);
          break;
        // 4-0
        case 52:
          this.play(68);
          break;
        case 53:
          this.play(70);
          break;
        case 54:
          this.play(72);
          break;
        case 55:
          this.play(74);
          break;
        case 56:
          this.play(75);
          break;
        case 57:
          this.play(77);
          break;
        case 58:
          this.play(79);
          break;
      }
    }
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

.active-right{
  background-color: #48a9e2;
  box-shadow: 0 4px 8px #333 inset;
}
.active-left{
  background-color: #8dc221;
  box-shadow: 0 4px 8px #333 inset;
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
  padding: 36px 24px 27px 26px;
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
  margin-left: 24px;
}

.piano-key-mid-right {
  margin-right: 24px;
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
  margin-right: 217px;
}

.piano-key-left-shift {
  width: 134px;
}

.piano-key-right-shift {
  width: 133px;
}

.piano-key-invisible {
  visibility: hidden;
}

.piano-key-left-ctrl, .piano-key-right-ctrl {
  width: 108.5px;
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
</style>