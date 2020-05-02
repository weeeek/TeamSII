<template>
    <div class="team-detail">
      <div class="flag" :class="team.win?'win':'lose'" :style="`background-image:url('https://content.nf.migu.cn/soe/uniaccess?fileID=${team.image}')`"></div>
    </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        team: this.data
      }
    },
    methods: {
      to () {
        if (this.team.win) {
          return this.team.vote + 100000
        }
      },
      animateEnd () {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .team-detail
    display block
    text-align left
    .flag
      width 100%
      height 70px
      background-position center center
      background-repeat no-repeat
      background-size cover
</style>
