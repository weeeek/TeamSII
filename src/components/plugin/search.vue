<template>
  <div class="search-box">
    <jam-search @click="click" />
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <jam-delete @click="clear" v-show="query" />
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索成员、关键字'
      },
      click: {
        type: Function,
        default: function () {
          return
        }
      }
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      },
      blur () {
        this.$refs.query.blur()
      }
    },
    created () {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-bg
    border-radius: 6px
    svg
      cursor pointer
    .icon-search
      font-size: 24px
      color: $color-bg
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-bg
      color: $color-black-dd
      font-size: $font-size-medium
      outline: 0
      &::placeholder
        color: $color-text-ddd
    .icon-dismiss
      font-size: 16px
      color: $color-bg
</style>
