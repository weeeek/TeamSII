<template>
  <div id="raise-container">
    <div class="block">
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
      <a :class="`project-item member${index}`" v-for="(obj, index) in raiseFilter" :key="obj.id" target="_blank" :href="obj.href">
        <div class="project-info" :style="`background-image:url(${obj.img})`">
            <h3 class="project-title text-ellipsis">{{obj.name}}</h3>
        </div>
        <progressbar :value="getProgress(obj.progress)" :type="getProgressType(obj.progress)"></progressbar>
        <!-- <p class="project-progress">{{ obj.backer_money }}/{{ obj.install_money_fmt }}</p> -->
        <p class="project-progress">
          <span v-if="obj.backer_money">￥{{ obj.backer_money }}</span>
          <span v-if="!obj.backer_money">预约中</span>
        </p>
      </a>
    </div>
    <img src="http://47.97.248.244/static/images/TeamSII小金库.jpg" alt="" style="margin: 15px auto 0 auto; display: inline-block; max-width: 650px"/>
  </div>
</template>

<script type="text/ecmascript-6">
import {modianApi} from 'config/common'
import {getMemberData} from 'config/memberData'
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
      memberData: [],
      show: true,
      all: false,
      blossom: true,
      YYHList: [],
      modianDatas: []
    }
  },
  watch: {
    all (newValue) {
      this.all = newValue
      this.YYHList.map((item) => {
        item.checked = this.all
        this.exchange(item)
      })
    }
  },
  created () {
    getMemberData().then((res) => {
      this.memberData = res.memberData
    })
  },
  mounted () {
    let _this = this
    // 1、创建访问数据库的对象
    // 2、使用事务处理
    if (!openDatabase) {
      alert('websql并未列入html标准中，只有chrome、Safari等部分webkit浏览器支持，其他浏览器均不支持。请使用chrome浏览此页。')
    }
    var db = openDatabase('TeamSII', '', 'Team SII Database', 1024 * 100)
    /*
        openDatabase(),作用打开数据，如果数据库不存在，则会创建一个新的数据库。
        五个参数说明：数据库名称、版本号、描述文本、数据库大小、创建回调
    */
    // 事件处理，异步
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS YYHList(id TEXT,name TEXT,enabled BIT,checked BIT)', [])
      tx.executeSql('SELECT * FROM YYHList', [], (tx, rs) => {
        if (rs.rows.length <= _this.memberData.length) {
          // 数据库数据不对，重新加载数据库
          tx.executeSql('DELETE FROM YYHList')
          // _this.addData(db, 2112648, "Team SII", true, true)
          _this.addData(db, 6334669, 'Team SII', true, true)
          _this.YYHList = []
          _this.memberData.map((y) => {
            // 勾上
            Object.assign(y.modian, {checked: true})
            // 写入数据库，并初始化所有的集资信息
            _this.addData(db, y.modian.id, y.name, y.modian.enabled, y.modian.checked)
          })
        } else {
          _this.YYHList = []
          for (var i = 0; i < rs.rows.length; i++) {
            let item = rs.rows.item(i)
            item.checked = item.checked === 'true'
            item.enabled = item.enabled === 'true'
            // if(item.id == 2112648){
            //   if(!(new Date().getMonth() < 7 && new Date().getMonth() > 1))
            //     _this.YYHList.push(item)
            // }
            // else
            _this.YYHList.push(item)
          }
          // 有一个checked的，all就勾上，这里操作all会被watch到
          // _this.all = _this.YYHList.filter((x)=>{return x.checked}).length > 0
          _this.initModianDatas(_this)
        }
      })
    })
  },
  methods: {
    getProgressType (value) {
      if (value >= 0 && value < 25) {
        return 'danger'
      }
      if (value >= 25 && value < 50) {
        return 'warning'
      }
      if (value >= 50 && value < 75) {
        return 'info'
      }
      return 'success'
    },
    getProgress (value) {
      return Number.parseFloat(value)
    },
    addData (db, id, name, enabled, checked) {
    /*
      transaction()函数,用以处理事务：
      包含事务内容的一个方法
      执行成功回调函数（可选）
      执行失败回调函数（可选）
      */
      let _this = this
      db.transaction((tx) => {
        /*
        executeSql()函数用以执行SQL语句，返回结果，方法有四个参数
        1、查询字符串
        2、用以替换查询字符串中问号的参数
        3、执行成功回调函数（可选）
        4、执行失败回调函数（可选）
        */
        tx.executeSql('SELECT * FROM YYHList WHERE id=?', [id], (tx, rs) => {
          if (rs.rows.length < 1) {
            tx.executeSql('INSERT INTO YYHList VALUES(?,?,?,?)', [id, name, enabled, checked], (tx, rs) => {
              if (enabled) {
                _this.YYHList.push({
                  name: name,
                  id: id,
                  enabled: enabled,
                  checked: checked
                })
                _this.getModianData(_this, id, name)
              }
            },
            (tx, erro) => {
              alert(erro.source + '::' + erro.message)
            })
          }
        })
      })
    },
    exchange (m) {
      let _this = this
      var db = openDatabase('TeamSII', '', 'Team SII Database', 1024 * 100)
      db.transaction((tx) => {
        // console.log(m.id, m.checked)
        tx.executeSql('UPDATE YYHList SET checked=? WHERE id=?', [m.checked, m.id], (tx, rs) => {
          if (m.checked && !m.got) {
            m.got = true
            _this.getModianData(_this, m.id, m.name)
          }
        })
      },
      (tx, erro) => {
        alert(erro.source + '::' + erro.message)
      })
    },
    initModianDatas (_this) {
      _this.YYHList.filter((x) => { return x.enabled })
              .map((y) => {
                Object.assign(y, { got: y.checked })
                if (y.got) {
                  _this.getModianData(_this, y.id, y.name)
                }
              }
      )
    },
    getModianData (_this, id, name) {
      if (_this.modianDatas.filter((x) => { return x.user_id === id }).length > 0) {
        return
      }
      // jQuery.post(`${modianApi}`, { to_user_id: id }, function (response) {
      //              let json = JSON.parse(response)
      //              //所有项目
      //              let data = JSON.parse(json.data)
      //              //最新项目
      //              //_this.modianDatas.push(data[0]);
      //              data.filter((m)=>{
      //                return m.status === '众筹中'
      //              }).forEach(element => {
      //                _this.modianDatas.push(element)
      //              });
      //             })
      jQuery.ajax({
        url: modianApi,
        type: 'POST',
        data: {
          page: 1,
          page_size: 5,
          user_id: id
        },
        dataType: 'json',
        success: function (res) {
          switch (res.status) {
            case '1':
            case 1: // 有数据
              var el = jQuery('<div></div>')
              el.html(res.data.html)
              // 所有项目
              let list = jQuery('li:eq(0)', el) // All the anchor elements
              let money = list.find('.pro_status').text()
              let progress = list.find('.pro_type').text()
              if (progress.includes('预约')) {
                progress = '进度：0'
              }
              _this.modianDatas.push({
                user_id: id,
                href: list.find('a:eq(0)').attr('href'),
                name: list.find('.pro_name').text(),
                progress: Number.parseFloat(progress.substr(3)),
                img: list.find('img').attr('src'),
                backer_money: Number.parseFloat(money.substr(4))
              })
              break
            case -1: // 没有数据
            default:
              break
          }
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
  },
  computed: {
    raiseFilter: function () {
      return this.modianDatas.filter((x) => {
        if (this.YYHList.filter((y) => {
          return y.id === x.user_id && y.checked
        }).length > 0) {
          return x
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/project"
  @media screen and (min-width 1366px)
    #raise-container
      padding-bottom 15px
  @media screen and (max-width 1366px)
    #raise-container
      padding-bottom 10px
</style>
