<template>
  <div id="focus-container">
    <div class="block flex">
      <div class="search flex-grow">
        <search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></search>
      </div>
      <button class="btn-3d btn-upload float-right" @click="upload">上传</button>
    </div>
    <h2 style="margin: .5em 0">直拍</h2>
    <div class="project-wrap flex flex-wrap flex-justify-between">
      <a :class="`project-item flex-l-4 flex-m-3 flex-s-2 flex-xs-1 member${i}`" target="_blank" :href="item.url" v-for="(item, i) in focusFilter" :key="i">
        <div class="project-info">
          <img v-lazy="item.img" />
          <p class="text-ellipsis">{{item.from}}<br />{{item.title}}</p>
        </div>
      </a>
    </div>
    <h2 style="margin: .5em 0">合影</h2>
    <div class="project-wrap flex flex-wrap flex-justify-between">
      <a :class="`project-item flex-l-4 flex-m-3 flex-s-2 flex-xs-1 member${i}`" target="_blank" :href="item.img" v-for="(item, i) in photoFilter" :key="i">
        <div class="project-info">
          <img v-lazy="item.img" style="object-fit: contain" />
          <p class="text-ellipsis">{{item.from}}<br />{{item.title}}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";
import { getFocusData } from 'config/focusData'
import Search from 'components/plugin/search'
import { searchMixin } from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  components: {
    Search
  },
  data () {
    return {
      FocusList: [],
      PhotoList: []
    }
  },
  mounted () {
    getFocusData().then(res => {
      // 全部数据
      this.FocusList = res.focus
      this.PhotoList = res.photo
    })
  },
  methods: {
    upload() {
      this.setUploadType("Photo");
      this.triggerUploader();
    },
    ...mapActions(["triggerUploader", "setUploadType"]),
  },
  computed: {
    focusFilter () {
      var query = this.query.trim().toLowerCase()
      if (!query) {
        return this.FocusList
      }
      return this.FocusList.filter((y) => {
        return y.title.toLowerCase().includes(query) || y.from.toLowerCase().includes(query)
      })
    },
    photoFilter () {
      var query = this.query.trim().toLowerCase()
      if (!query) {
        return this.PhotoList
      }
      return this.PhotoList.filter((y) => {
        return y.title.toLowerCase().includes(query) || y.from.toLowerCase().includes(query)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/project"
  @import "~common/stylus/screen"
  @import '~common/stylus/3dButton';
  .btn-upload
    margin-left 10px
  #focus-container
    .project-wrap
      column-count unset
      column-gap unset
      .project-info
        height calc(190px + 2.8em)
        margin-bottom 0
        img
          width 100%
          height 190px
          display block
        p
          line-height 1.4em
          text-align center
          margin 10px 0
  @media screen and (min-width 1366px)
    #focus-container
      padding-bottom 15px
  @media screen and (max-width 1366px)
    #focus-container
      padding-bottom 10px
    .btn-upload
      margin-top 4px
      margin-bottom 4px
</style>
