<template>
  <div id="focus-container">
    <div class="block">
        <div class="project-filter">
          <div class="members" v-show="show">
            <div class="member" v-for="(m, index) in DataList" :key="m.id" v-on:click="exchange(m)">
              <blockcheck :class="`.member${index}`" :id="m.id" :text="m.name" :status.sync="m.checked"></blockcheck>
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
    getFocusData().then(res => {
      this.DataList = res.map(x => { return { id: x.id, name: x.name, checked: true, list: x.list } })
    })
  },
  methods: {
    exchange (m) {}
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
      padding 10px 0
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
