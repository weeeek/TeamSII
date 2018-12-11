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
                    <p class="project-progress">{{ obj.backer_money }}/{{ obj.install_money_fmt }}</p>
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
      },{
        back_count: 44,
        backer_count: 44,
        backer_days: "",
        backer_money: "3832.00",
        bullish_count: "",
        button_if_show: 1,
        category: "粉丝应援",
        content: "",
        content_url: "https://m.modian.com/project/client_detail_41052.html?from=app_inner?t=1544517402",
        count_down: "",
        des: "【故事背景】（本故事纯属虚构）↵↵尼罗河上，诅咒暗藏，星辰隐曜，月神异样。托特将古书预言埋葬，留给努特无尽迷惘。纵是天空女神，也无法参透月神的想象。↵↵",
        end_time: "2018-12-05 00:00:00",
        examine_modify_time: "2018-12-03 11:49",
        focus_count: 45,
        id: "41052",
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
        logo: "https://p.moimg.net/project/project_20181203_1543808649_4420_crop.jpg?imageMogr2/auto-orient/strip%7cimageView2/2/w/750/h/750/q/100",
        logo_4x3: "https://p.moimg.net/project/project_20181203_1543808634_3185.jpg?imageMogr2/auto-orient/strip",
        moxi_post_id: "61752",
        name: "【冰火交锋】火神与铁匠之神Hephaestus陈思篇",
        post_num: 74,
        pro_class: "202",
        pro_type: "6",
        process_status: "1",
        progress: "34.84",
        real_backer_money: "",
        short_title: "【冰火交锋】火神与铁",
        start_time: "2018-12-03 13:30",
        status: "已提现",
        status_code: 0,
        subscribe_count: 3,
        subscribe_time: "",
        task_if_show: 0,
        teamfund_count: "0",
        update_count: "0",
        user_icon: "https://p.moimg.net/icon/2015/06/02/988407_1493177899.jpeg?imageMogr2/auto-orient/strip%7cimageView2/2/w/150/h/150/q/100",
        user_id: "988407",
        username: "有节操的DK",
      },{
        back_count: 137,
        backer_count: 137,
        backer_days: "",
        backer_money: "8570.00",
        bullish_count: "",
        button_if_show: 1,
        category: "粉丝应援",
        content: "",
        content_url: "",
        count_down: "",
        des: "艾斯喵公演解锁计划↵每天都在看公演，是时候办一场属于艾斯喵自己的公演啦！↵↵活动形式：↵24小时内，集资额每上涨500元，即解锁一首公演曲目。",
        end_time: "2018-12-06 23:59:00",
        examine_modify_time: "2018-12-05 23:51",
        focus_count: 140,
        id: 41902,
        if_bullish: "",
        if_focus: "",
        if_hide_backer_info: "0",
        if_show: 1,
        if_subscribe: "",
        image_type: "",
        install_money: "10000",
        install_money_fmt: "10,000",
        is_wds: 1,
        left_time: "2018-12-06",
        logo: "https://p.moimg.net/bbs_attachments/2018/12/05/20181205_1544024648_5437.jpg?imageMogr2/auto-orient/strip%7cimageView2/2/w/750/h/750/q/100",
        logo_4x3: "https://p.moimg.net/bbs_attachments/2018/12/05/20181205_1544024649_7193.jpg?imageMogr2/auto-orient/strip",
        moxi_post_id: 62223,
        name: "【能不能给我一首歌的时间】",
        post_num: 200,
        pro_class: "202",
        pro_type: 6,
        process_status: "",
        progress: "85.70",
        real_backer_money: "",
        short_title: "【能不能给我一首歌的",
        start_time: "2018-12-05 23:59",
        status: "已提现",
        status_code: 0,
        subscribe_count: 0,
        subscribe_time: "",
        task_if_show: 0,
        teamfund_count: "",
        update_count: "",
        user_icon: "https://p.moimg.net/ico/2018/09/27/20180927_1538044929_6904.jpg?imageMogr2/auto-orient/strip%7cimageView2/2/w/150/h/150/q/100",
        user_id: "2112648",
        username: "SNH48TeamSII应援会"
      },{
        back_count: 20,
        backer_count: 20,
        backer_days: "",
        backer_money: "4397.96",
        bullish_count: "",
        button_if_show: 1,
        category: "粉丝应援",
        content: "",
        content_url: "",
        count_down: "",
        des: "赵晔与蒋芸，两位李逍遥，孰真孰假? 7.10 19:00 -7.12 19:00 诚邀各位共鉴秋毫。↵364510713 等你来寻。",
        end_time: "2018-07-12 19:00:00",
        examine_modify_time: "2018-07-10 16:00",
        focus_count: 19,
        id: "25382",
        if_bullish: "",
        if_focus: "",
        if_hide_backer_info: "0",
        if_show: "1",
        if_subscribe: "",
        image_type: "",
        install_money: "5000",
        install_money_fmt: "5,000",
        is_wds: 1,
        left_time: "2018-07-12",
        logo: "https://p.moimg.net/bbs_attachments/2018/07/10/20180710_1531208812_1238.jpg?imageMogr2/auto-orient/strip%7cimageView2/2/w/750/h/750/q/100",
        logo_4x3: "https://p.moimg.net/bbs_attachments/2018/07/10/20180710_1531208813_6157.jpg?imageMogr2/auto-orient/strip",
        moxi_post_id: "37774",
        name: "【总选】谁主逍遥PK【赵晔篇】",
        post_num: 69,
        pro_class: "202",
        pro_type: "6",
        process_status: "0",
        progress: "87.96",
        real_backer_money: "",
        short_title: "【总选】谁主逍遥PK",
        start_time: "2018-07-10 19:00",
        status: "已提现",
        status_code: 0,
        subscribe_count: 0,
        subscribe_time: "",
        task_if_show: 0,
        teamfund_count: "0",
        update_count: "0",
        user_icon: "https://u.moimg.net/ico/1093167_1502295740_150x150.jpg",
        user_id: "1093167",
        username: "SNH48赵晔应援会"
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
    display grid;
    grid-template-columns repeat(4, 1fr)
    justify-content space-between
    align-content space-between
    grid-auto-flow row
    grid-gap 15px
    justify-items stretch
    align-items stretch      
    .project-item
      justify-self stretch
      align-self stretch
      .project-progress
        margin-top 10px
      .project-info
        width 312.75px
        height 234px
        line-height 234px
        margin-bottom 10px
        background-size cover
        background-position center center
        background-repeat no-repeat
        &:hover
          .project-title
            opacity 1
        .project-title
          opacity 0
          vertical-align middle
          text-align center
          font-weight bolder
          color #FFF
          transition opacity .6s ease-in-out
</style>
