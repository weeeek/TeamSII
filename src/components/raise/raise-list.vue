<template>
  <div class="block">
    <!-- <iframe src="https://teamsii.top" id="raise"></iframe> -->
        <div class="project">
            <ul class="project-filter">
                <li class="member active"><a data-filter="*" href="javascript:void(0)">All</a></li>
                <li class="member" v-for="(m, index) in YYHList" :key="m.id"><a :data-filter="`.member${index}`" href="javascript:void(0)">{{m.name}}</a></li>
            </ul>
            <div class="project-wrap">
                <a :class="`project-item member${index}`" v-for="(obj, index) in modianDatas" :key="obj.id" target="_blank" :href="`https://zhongchou.modian.com/item/${obj.id}.html`">
                    <div class="project-info" :style="`background-image:url(${obj.logo_4x3})`">                        
                        <h3 class="project-title text-ellipsis">{{obj.name}}</h3>                        
                    </div>                        
                    <progressbar :value="getProgress(obj.progress)" :type="getProgressType(obj.value)"></progressbar>
                    <p>{{ obj.backer_money }}/{{ obj.install_money_fmt }}</p>
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
      modianDatas: [{
        back_count: 63,
        backer_count: 63,
        backer_days: "",
        backer_money: "9516.00",
        bullish_count: "",
        button_if_show: 1,
        category: "粉丝应援",
        content: "",
        content_url: "",
        count_down: "",
        des: "【决战时间】↵12月3日13:30 ~12月4日 24:00↵↵烈火照群山，雪后海风寒。↵众神欲酣战，好戏正上演。",
        end_time: "2018-12-05 00:00:00",
        examine_modify_time: "2018-12-03 10:50",
        focus_count: 61,
        id: "41043",
        if_bullish: "",
        if_focus: "",
        if_hide_backer_info: "0",
        if_show: "1",
        if_subscribe: "",
        image_type: "",
        install_money: "11000",
        install_money_fmt: "11,000",
        is_wds: 1,
        left_time: "2018-12-05",
        logo: "https://p.moimg.net/bbs_attachments/2018/12/03/20181203_1543805130_3294.jpg?imageMogr2/auto-orient/strip%7cimageView2/2/w/750/h/750/q/100",
        logo_4x3: "https://p.moimg.net/bbs_attachments/2018/12/03/20181203_1543805135_9435.jpg?imageMogr2/auto-orient/strip",
        moxi_post_id: "61746",
        name: "【冰火交锋】——狩猎女神ARTEMIS陈观慧篇",
        post_num: 103,
        pro_class: "202",
        pro_type: "6",
        process_status: "0",
        progress: "86.51",
        real_backer_money: "",
        short_title: "【冰火交锋】——狩猎",
        start_time: "2018-12-03 13:30",
        status: "已提现",
        status_code: 0,
        subscribe_count: 2,
        subscribe_time: "",
        task_if_show: 0,
        teamfund_count: "0",
        update_count: "0",
        user_icon: "https://p.moimg.net/ico/2018/01/02/20180102_1514905791_1727.jpg?imageMogr2/auto-orient/strip%7cimageView2/2/w/150/h/150/q/100",
        user_id: "1485197",
        username: "SNH48_陈观慧应援会"
      }]
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
    // raiseConfig.map((y)=>{
    //   jQuery.post(`${modianApi}`, { to_user_id: y.id }, function (response) {
    //     let json = JSON.parse(response)
    //     let data = JSON.parse(json.data)        
    //     console.log("data",data)
    //     })
    // })
    // jQuery.post(`${modianApi}`, { to_user_id: raiseConfig[0].id }, function (response) {
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
#raise
  width 100%
  border none
  overflow none
  height calc(100vh - 362px)
  #header
    display none
  .flat-footer
    display none


.project
  display flex
  flex-direction column
  .project-filter
    list-style none
    flex-basis 60px
    flex-grow 1
    flex-shrink 0
  .project-wrap
    flex-grow 1
    display flex
    flex-direction row
    justify-content space-between
    .project-item
      flex-grow 0
      flex-shrink 0
      flex-basis 320px
      .project-info
        width 320px
        height 240px
        line-height 240px        
        background-size cover
        background-position center center
        background-repeat no-repeat
        &:hover
          .project-title
            display block
        .project-title
          display none
          vertical-align middle
          font-weight bolder
          color #FFF        
</style>
