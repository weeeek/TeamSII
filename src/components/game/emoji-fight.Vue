<template>
  <div id="wrapper" ref="wrapper">
    <ul id="btnGroup">
      <li class="startBtn"></li>
      <li class="rankingBtn"></li>
      <li class="settingBtn"></li>
      <li class="ruleBtn"></li>
    </ul>
    <span class="bombBtn"></span>
    <span class='ctrlBtn'></span>
    <canvas id="game"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">  
  import {gameInit} from 'game/fight/js/main'
  export default {
    name: 'EmojiFight',
    data () {
      return {
      }
    },
    mounted () {
      gameInit()
    }
  }
</script>

<style>
</style>


