<template>
    <div class="pk-container">
      <div class="pk-team">
        <div class="team" :class="data.color">{{data.name}}</div>      
      </div>
      <div class="line-vertical-normal" v-if="data.left || data.right">
          <div class="line-pk-mid-left" :class="data.color"></div>
          <div class="line-pk-mid-right" :class="data.color"></div>
      </div>
      <div class="line-horizontal-normal" v-if="data.left || data.right">
          <div class="line-pk-empty-left" :class="this.winTeamColor(data.left)"></div>
          <div class="line-pk-left" :class="this.winTeamColor(data.left)"></div>
          <div class="line-pk-right" :class="this.winTeamColor(data.right)"></div>
          <div class="line-pk-empty-right" :class="this.winTeamColor(data.right)"></div>
      </div>
      <div class="pk-sub" v-if="data.left || data.right">
        <div class="p-k">
          <p-k :data="data.left"></p-k>      
        </div>
        <div class="p-k">
          <p-k :data="data.right"></p-k>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">  
  import PK from 'components/plugin/pk'
  export default {
    name: 'PK',
    components: {
      PK
    },
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        title: ''
      }
    },
    methods: {
      winTeamColor (obj) {
        if(obj.win)
          return obj.color
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
      flex 0 0 200px
      display flex 
      flex-direction row
      justify-content center
      .team
        border-width 2px
        border-style solid
        border-color $color-black-d
        flex 0 0 100px
        height 200px
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
      .p-k
        flex 0 0 50%
</style>
