<template>
  <div id="focus-container">
    <div class="block">
      <div class="project-filter">
        <div class="members" v-show="show">
          <div class="member" v-for="(m, index) in DataList" :key="m.id">
            <blockcheck :class="`.member${index}`" :id="m.id" :text="m.name" v-bind:status.sync="m.checked" @statusChange="exchange(m)"></blockcheck>
          </div>
        </div>
      </div>
      <br />
      <div class="search">
        <trip-search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></trip-search>
      </div>
    </div>
    <div v-for="(obj, i) in focusFilter" :key="obj.id">
        <p class="focusor">{{obj.name}}</p>
        <div class="project-wrap">
            <a :class="`project-item member${i}`" v-for="item in obj.list" :key="item.url" target="_blank" :href="item.url">
            <div class="project-info" :style="`background-image:url(${item.img})`">
                <h3 class="project-title text-ellipsis">{{item.from}}<br />{{item.title}}</h3>
            </div>
            </a>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getFocusData } from 'config/focusData'
import TripSearch from 'components/plugin/search'
import blockcheck from 'components/plugin/blockCheck'
import { searchMixin } from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  components: {
    blockcheck,
    TripSearch
  },
  data () {
    return {
      show: true,
      all: false,
      DataList: []
    }
  },
  mounted () {
    let _this = this
    getFocusData().then(res => {
      // 全部数据
      this.DataList = res.map(x => { return { id: x.id, name: x.name, checked: false, list: x.list } })

      if (!openDatabase) {
        console.log('websql并未列入html标准中，只有chrome、Safari等部分webkit浏览器支持，其他浏览器均不支持。请使用chrome浏览此页。')
        return
      }
      // 1、创建访问数据库的对象
      var db = openDatabase('TeamSII', '', 'Team SII Database', 1024 * 100)
      /*
          openDatabase(),作用打开数据，如果数据库不存在，则会创建一个新的数据库。
          五个参数说明：数据库名称、版本号、描述文本、数据库大小、创建回调
      */
      // 2、使用事务处理
      // 事件处理，异步
      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS FocusList(id TEXT,name TEXT,checked BIT)', [])
        tx.executeSql('SELECT * FROM FocusList', [], (tx, rs) => {
          if (rs.rows.length < _this.DataList.length) {
            // 数据库数据不对，重新加载数据库
            tx.executeSql('DELETE FROM FocusList')
            _this.DataList.map((y) => {
              // 勾上
              y.checked = true
              // 写入数据库，并初始化所有的集资信息
              _this.addData(db, y.id, y.name, y.checked)
            })
          } else {
            // 数据对得上
            for (var i = 0; i < rs.rows.length; i++) {
              _this.checkedChange(rs.rows[i].id, rs.rows[i].checked === 'true')
            }
          }
        })
      })
    })
  },
  methods: {
    addData (db, id, name, checked) {
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
        tx.executeSql('SELECT * FROM FocusList WHERE id=?', [id], (tx, rs) => {
          if (rs.rows.length < 1) {
            // 没有这条，插入
            tx.executeSql('INSERT INTO FocusList VALUES(?,?,?)', [id, name, checked], (tx, rs) => {
              if (checked) {
                _this.checkedChange(id, checked)
              }
            },
            (tx) => {
              console.log(tx.source + '::' + tx.message)
            })
          }
        })
      })
    },
    exchange (m) {
      console.log(m.id, m.checked)
      let _this = this
      var db = openDatabase('TeamSII', '', 'Team SII Database', 1024 * 100)
      db.transaction((tx) => {
        tx.executeSql('UPDATE FocusList SET checked=? WHERE id=?', [m.checked, m.id], (tx, rs) => {
          _this.checkedChange(m.id, m.checked)
        })
      },
      (tx) => {
        console.log(tx.source + '::' + tx.message)
      })
    },
    checkedChange (id, status) {
      this.DataList.find(x => x.id === id).checked = status
    }
  },
  computed: {
    focusFilter () {
      let data = []
      this.DataList.map((x) => {
        if (x.checked) {
          let temp = { id: x.id, name: x.name, checked: x.checked, list: [] }
          let query = this.query.toLowerCase()
          if (query) {
            x.list.map((y) => {
              if (y.title.toLowerCase().includes(query) || y.from.toLowerCase().includes(query)) {
                temp.list.push(y)
              }
            })
          } else {
            temp.list = x.list
          }
          data.push(temp)
        }
      })
      return data
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/project"

  #focus-container
    .focusor
      padding 10px 0 10px 15px
    .project-info
      height 180px
      line-height 90px
  @media screen and (min-width 1366px)
    #focus-container
      padding-bottom 15px
  @media screen and (max-width 1366px)
    #focus-container
      padding-bottom 10px
</style>
