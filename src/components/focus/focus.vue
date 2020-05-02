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
import blockcheck from 'components/plugin/blockCheck'

export default {
  components: {
    blockcheck
  },
  data () {
    return {
      show: true,
      all: false,
      DataList: []
    }
  },
  watch: {
    all (newValue) {
      this.all = newValue
    //   this.FocusList.map((item) => {
    //     item.checked = this.all
    //     this.exchange(item)
    //   })
    }
  },
  created () {
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
      return this.DataList.filter((x) => {
        if (x.checked) {
          return x
        }
      })
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
