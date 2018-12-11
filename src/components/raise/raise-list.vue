<template>
  <div>
    <div class="block">
      <!-- <iframe src="https://teamsii.top" id="raise"></iframe> -->
        <ul class="project-filter">
            <li class="member active"><a data-filter="*" href="javascript:void(0)">All</a></li>
            <li class="member" v-for="(m, index) in YYHList" :key="m.id"><a :data-filter="`.member${index}`" href="javascript:void(0)">{{m.name}}</a></li>
        </ul>
    </div>
    <div class="block">
      <div class="project-wrap">
          <a :class="`project-item member${index}`" v-for="(obj, index) in modianDatas" :key="obj.id" target="_blank" :href="`https://zhongchou.modian.com/item/${obj.id}.html`">
              <div class="project-info" :style="`background-image:url(${obj.logo_4x3})`">                        
                  <h3 class="project-title text-ellipsis">{{obj.name}}</h3>                        
              </div>                        
              <progressbar :value="getProgress(obj.progress)" :type="getProgressType(obj.value)"></progressbar>
              <!-- <p class="project-progress">{{ obj.backer_money }}/{{ obj.install_money_fmt }}</p> -->
              <p class="project-progress">￥{{ obj.backer_money }}</p>
          </a>                
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {raiseConfig, modianApi} from 'api/config'
import jQuery from 'jquery'
import progressbar from 'components/plugin/progressbar'

export default {
  components: {
    progressbar
  },
  data () {
    return {
      YYHList:[],
      modianDatas: []
    }
  },
  methods: {
    getProgressType(value){
        if(value >= 0 && value < 25)
            return 'danger'            
        if(value >= 25 && value < 50)
            return 'warning'            
        if(value >= 50 && value < 75)
            return 'info'
        else
            return 'success'
    },
    getProgress(value){
        return Number.parseFloat(value)
    },
    initProject (response) {
    console.log('data',JSON.parse(response.data))
    }
  },
  mounted () {
    let _this = this
    _this.YYHList = raiseConfig
    raiseConfig.map((y)=>{
      jQuery.post(`${modianApi}`, { to_user_id: y.id }, function (response) {
        let json = JSON.parse(response)
        let data = JSON.parse(json.data)   
        //最新项目
        _this.modianDatas.push(data[0]);
        })
    })
    // jQuery.post(`${modianApi}`, { to_user_id: raiseConfig[25].id }, function (response) {
    //     let json = JSON.parse(response)
    //     let data = JSON.parse(json.data)        
    //     console.log("data",data)
    //     //最新项目
    //     _this.modianDatas.push(data[0]);
    //     })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.member
  display inline-block
  padding 6px 12px
  .active
    border 1px solid #87cefa
  &:hover
    box-shadow 0 0 3px #97cefa


.project-filter
  list-style none
.project-wrap
  display flex
  flex-direction column
  justify-content space-between
  align-content space-between
  .project-item
    flex-grow 1
    flex-basis 300px
    flex-shrink 0
    .project-progress
      margin-top 10px
    .project-info
      width 300px
      height 225px
      line-height 225px
      margin-bottom 10px
      background-size cover
      background-position center center
      background-repeat no-repeat
      &:hover          
        .project-title
          background-color rgba(0,0,0,.6)
          opacity 1
      .project-title
        opacity 0
        vertical-align middle
        text-align center
        font-weight bolder
        color #FFF
        transition all .5s ease-in-out
</style>
