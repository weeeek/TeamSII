<template>
  <div>
    <div class="block">
      <!-- <iframe src="https://teamsii.top" id="raise"></iframe> -->
        <div class="project-filter">
          <div class="member-all">
            <div class="member-switch">
              <switcher :onText="``" :offText="``" :status.sync="all"></switcher>
            </div>
            <div class="flex-grow"></div>
            <button class="icon-toggle" :title="show?'收起':'展开'" :class="{'icon-toggle-animation-jump':show,'icon-toggle-animation-diving':!show}" @click="show=!show">
              <div class="toggle-content "></div>
            </button>
          </div>
          <div class="members" v-show="show">
            <div class="member" v-for="(m, index) in YYHList" :key="m.id" v-on:click="exchange(m)">
              <blockcheck :class="`.member${index}`" :id="m.id" :text="m.name" :status.sync="m.checked"></blockcheck>
            </div>
          </div>
        </div>
    </div>
    <div class="project-wrap">
      <a :class="`project-item member${index}`" v-for="(obj, index) in raiseFilter" :key="obj.id" target="_blank" :href="`https://zhongchou.modian.com/item/${obj.id}.html`">
        <div class="project-info" :style="`background-image:url(${obj.logo_4x3})`">                        
            <h3 class="project-title text-ellipsis">{{obj.name}}</h3>                        
        </div>                        
        <progressbar :value="getProgress(obj.progress)" :type="getProgressType(obj.value)"></progressbar>
        <!-- <p class="project-progress">{{ obj.backer_money }}/{{ obj.install_money_fmt }}</p> -->
        <p class="project-progress">￥{{ obj.backer_money }}</p>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {raiseConfig, modianApi} from 'api/config'
import jQuery from 'jquery'
import progressbar from 'components/plugin/progressbar'
import blockcheck from 'components/plugin/blockCheck'
import switcher from 'components/plugin/switcher'

export default {
  components: {
    blockcheck,
    switcher,
    progressbar
  },
  data () {
    return {
      show:true,
      all:false,
      blossom:true,
      YYHList:[],
      modianDatas: []
    }
  },
  watch:{
    all(newValue){
      this.all = newValue
      console.log(newValue)

      this.YYHList.map((item)=>{
        item.checked = this.all
        this.exchange(item)
      })
    }
  },
  mounted () {
    let _this = this;
    // 1、创建访问数据库的对象
    // 2、使用事务处理
    var db = openDatabase("TeamSII", "", "Team SII Database", 1024 * 100);
    /*
        openDatabase(),作用打开数据，如果数据库不存在，则会创建一个新的数据库。
        五个参数说明：数据库名称、版本号、描述文本、数据库大小、创建回调
    */
    //事件处理，异步
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS YYHList(id TEXT,name TEXT,line INTEGER,enabled BIT,checked BIT)", [])
        tx.executeSql("SELECT * FROM YYHList", [], function(tx, rs) {          
          if(rs.rows.length != raiseConfig.length){
            // 数据库数据不对，重新加载数据库
            tx.executeSql("DELETE FROM YYHList")
            _this.YYHList=[]
            raiseConfig.sort(function(a,b){return a.line - b.line})
                      .map((y)=>{
                        //所有都勾上
                        Object.assign(y,{checked:true})
                        //写入数据库，并初始化所有的集资信息
                        _this.addData(db,y.id,y.name,y.line,y.enabled,y.checked)
                      })
          }
          else{
            _this.YYHList=[]
            for (var i = 0; i < rs.rows.length; i++) {
              let item = rs.rows.item(i)
              item.checked = item.checked=="true"
              item.enabled = item.enabled=="true"
              _this.YYHList.push(item)              
            }
            //有一个checked的，all就勾上
            _this.all = _this.YYHList.filter((x)=>{return x.checked}).length > 0
            _this.initModianDatas(_this)
          }
        })
    })
  },
  methods: {
    getProgressType (value) {
      if(value >= 0 && value < 25)
          return 'danger'            
      if(value >= 25 && value < 50)
          return 'warning'            
      if(value >= 50 && value < 75)
          return 'info'
      else
          return 'success'
    },
    getProgress (value) {
        return Number.parseFloat(value)
    },
    initProject (response) {
      console.log('data',JSON.parse(response.data))
    },
    resetAllYYHList () {
      this.YYHList = [];
    },    
    addData (db,id,name, line, enabled,checked) {
    /*
      transaction()函数,用以处理事务：
      包含事务内容的一个方法
      执行成功回调函数（可选）
      执行失败回调函数（可选）
      */
      let _this = this;
      db.transaction(function(tx) {
        /*
        executeSql()函数用以执行SQL语句，返回结果，方法有四个参数
        1、查询字符串
        2、用以替换查询字符串中问号的参数
        3、执行成功回调函数（可选）
        4、执行失败回调函数（可选）
        */
        tx.executeSql("SELECT * FROM YYHList WHERE id=?", [id], function(tx, rs) {
          if(rs.rows.length < 1){
            tx.executeSql("INSERT INTO YYHList VALUES(?,?,?,?,?)", [id, name, line, enabled, checked], function(tx, rs) {
              if(enabled){
                _this.YYHList.push({
                  name: name,
                  id: id,
                  line: line,
                  enabled: enabled,
                  checked: checked
                })
                _this.getModianData(_this,id)
              }
            },
            function(tx, erro) {
                alert(erro.source + "::" + erro.message);
            }
          )}
        })
      })
    },
    exchange (m) {
      let _this = this
      var db = openDatabase("TeamSII", "", "Team SII Database", 1024 * 100);
      db.transaction(function(tx) {
        //console.log(id,!checked)
        tx.executeSql("UPDATE YYHList SET checked=? WHERE id=?", [m.checked,m.id], function(tx, rs) {
              if(m.checked && !m.got){
                  m.got = true
                  _this.getModianData(_this,m.id)
                }
            })
          },
          function(tx, erro) {
              alert(erro.source + "::" + erro.message);
          }
        )
    },
    initModianDatas (_this) {
      _this.YYHList.filter((x)=>{return x.enabled})
               .sort(function(a,b){return a.line - b.line})
               .map((y)=>{
                  Object.assign(y,{got:y.checked})
                  if(y.got)
                    _this.getModianData(_this,y.id)
                  
      })
    },
    getModianData (_this,id) {
      if(_this.modianDatas.filter((x)=>{return x.user_id == id}).length > 0)
        return
      jQuery.post(`${modianApi}`, { to_user_id: id }, function (response) {
                   let json = JSON.parse(response)
                   //所有项目
                   let data = JSON.parse(json.data)   
                   //最新项目
                   _this.modianDatas.push(data[0]);
                  })
    }
  },
  computed: {
    //实时计算    
    raiseFilter: function () {
      return this.modianDatas.filter((x)=>{
        if(this.YYHList.filter((y)=>{
          return y.id == x.user_id && y.checked
        }).length > 0)
          return x
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.member
  display inline-block
  line-height 2.5em
  &:first-child
    display block
  
.project-filter
  display flex
  .member-all
    padding 12px
    flex-basis 5em
    flex-grow 0
    flex-shrink 0
    display flex
    flex-direction column
    .member-switch
      flex-basis 22px
      flex-grow 0
      flex-shrink 0
    .icon-toggle
      cursor pointer      
      flex-basis 1em
      flex-grow 0
      flex-shrink 0
      &:visited      
      &:focus
      &:active
      &:hover
        box-shadow none
  .members
    flex-grow 1
.project-wrap
  .project-item
    -webkit-column-break-inside avoid
    break-inside avoid
    background #ffffff
    box-shadow 2px 2px 2px rgba(0,0,0,.3)
    width 100%
    height 100%
    display block
    &:hover
      box-shadow 2px 2px 6px rgba(0,0,0,.4)      
      .project-info
        .project-title
          background-color rgba(0,0,0,.6)
          opacity 1
    .project-info
      width 100%
      background-size cover
      background-position center center
      background-repeat no-repeat
      .project-title
        opacity 0
        vertical-align middle
        text-align center
        font-weight bolder
        color #FFF
        transition all .5s ease-in-out

@media screen and (min-width 1024px)
  .member
    margin-right 1em
  .project-wrap
    -moz-column-count 4
    -webkit-column-count 4
    column-count 4
    -moz-column-gap 1em
    -webkit-column-gap 1em
    column-gap 1em
    .project-item
      padding 1em
      margin 0 0 15px 0
      .project-progress
        margin-top 10px
      .project-info
        width 100%
        height 190px
        line-height 190px
        margin-bottom 10px
          
@media screen and (max-width 1024px)  and (min-width 600px) 
  .project-wrap
    -moz-column-count 2
    -webkit-column-count 2
    column-count 2
    -moz-column-gap 1em
    -webkit-column-gap 1em
    column-gap 1em
    .project-item
      padding 1em
      margin 0 0 15px 0
      .project-progress
        margin-top 10px
      .project-info
        width 100%
        height 190px
        line-height 190px
        margin-bottom 10px

@media screen and (max-width 600px) 
  .project-wrap
    -moz-column-count 1
    -webkit-column-count 1
    column-count 1
    -moz-column-gap 1em
    -webkit-column-gap 1em
    column-gap 1em
    .project-item
      padding 1em
      margin 0 0 15px 0
      .project-progress
        margin-top 10px
      .project-info
        width 100%
        height 190px
        line-height 190px
        margin-bottom 10px
</style>
