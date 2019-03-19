<template>
    <div class="team-detail">
      <div>
        <animate-number 
          mode="auto"
          duration="1000"
          :from="team.vote" 
          :to="to()"
          :animate-end="animateEnd()">
        </animate-number>
      </div>
      <div>{{team.solo.join(',')}}</div>
      <div>{{team.double.join(',')}}</div>
      <div>{{team.multy.join(',')}}</div>
      <div>{{team.team.join(',')}}</div>
      <div>{{team.chorus.join(',')}}</div>
      <div>{{team.battle.join(',')}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
  import AnimateNumber from 'vue-animate-number'
  
  export default {
    props: {
      data: {
        type: Object
      }
    },
    components: {
      AnimateNumber
    },
    data () {
      return {
        team: this.data
      }
    },
    methods: {
      to () {
        if(this.team.win)
          return this.team.vote + 100000
      },
      animateEnd () {

      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .team-detail
    display block
    text-align left
    div
      display block
</style>
