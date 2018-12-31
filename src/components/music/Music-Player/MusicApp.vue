<template>
  <div id="music-app" @touchmove.prevent>
    <!-- <m-header></m-header>
    <music-tab></music-tab> -->
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  // import MHeader from 'components/music/Music-Player/m-header/m-header'
  // import MusicTab from 'components/music/Music-Player/tab/tab'
  import Player from 'components/music/Music-Player/player/player'

  export default {
    name: 'MusicApp',
    components: {
      // MHeader,
      // MusicTab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
