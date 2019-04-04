<template>
    <div class="pk-container">
      <div class="pk-team">
        <div class="team" :style="`background-image:url(${data.bg})`"></div>
      </div>
      <div class="line-vertical-normal" v-if="data.team.length > 0">
          <div class="line-pk-mid-left" :class="this.winTeamColor(data)"></div>
          <div class="line-pk-mid-right" :class="this.winTeamColor(data)"></div>
      </div>
      <div class="line-horizontal-normal" v-if="data.team.length > 0">
          <div class="line-pk-empty-left" :class="this.winTeamColor(data)"></div>
          <div class="line-pk-left" :class="this.winTeamColor(data)"></div>
          <div class="line-pk-right" :class="this.winTeamColor(data)"></div>
          <div class="line-pk-empty-right" :class="this.winTeamColor(data)"></div>
      </div>
      <div class="pk-sub" v-if="data.team.length > 0">
        <div class="p-k">
          <team class="team" :class="data.team[0].color" :data="data.team[0]"></team>          
        </div>
        <div class="p-k">
          <team class="team" :class="data.team[1].color" :data="data.team[1]"></team>          
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Team from 'components/plugin/pk-team'

  export default {
    props: {
      data: {
        type: Object
      }
    },
    components: {
      Team
    },
    data () {
      return {
        title: ''
      }
    },
    methods: {
      winTeamColor (data) {
        if(data.winner)
          return data.team[data.winner].color
      },
      winTeamName (data) {
        if(data.winner)
          return data.team[data.winner].name
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">  
  @import '~common/stylus/variable'
  @import '~common/stylus/snh48team'
  .pk-container
    display flex
    flex-direction column
    .pk-team
      flex 0 0 140px
      display flex 
      flex-direction row
      justify-content center
      .team
        border-width 2px
        border-style solid
        border-color $color-black-d
        flex 0 0 100px
        height 140px
        background-repeat no-repeat
        background-size cover
        background-position center center
    .line-vertical-normal
      flex 0 0 20px
      display flex
      .line-pk-mid-left
        flex-grow 1
        border-right 1px solid $color-black-d
        height 20px
      .line-pk-mid-right
        flex-grow 1
        border-left 1px solid $color-black-d
        height 20px
    .line-horizontal-normal
      flex 0 0 20px
      display flex
      .line-pk-empty-left
        border-right 1px solid $color-black-d
        flex-grow 1
        height 20px
      .line-pk-left
        border-left 1px solid $color-black-d
        border-top 2px solid $color-black-d
        flex-grow 1
        height 20px
      .line-pk-right
        border-right 1px solid $color-black-d
        border-top 2px solid $color-black-d
        flex-grow 1
        height 20px
      .line-pk-empty-right
        border-left 1px solid $color-black-d
        flex-grow 1
        height 20px
    .pk-sub
      display flex
      justify-content space-around
      .p-k
        flex 0 0 45%
        .team          
          border-width 2px
          border-style solid
          border-color $color-black-d
          flex 0 0 100px
          height 200px
</style>
