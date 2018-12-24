<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}"><a href="javascript:" @click="setCurrent(current - 1)"> « </a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="(p, index) in grouplist" :key="index" :class="{'active': current == p.val}">
        <a href="javascript:" @click="setCurrent(p.val)">{{ p.text }}</a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:" @click="setCurrent(page)"> 尾页 </a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:" @click="setCurrent(current + 1)"> »</a></li>
    </ul>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        current: this.currentPage
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5
          return v % 2 === 1 ? v : v + 1
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display)
      },
      grouplist: function () { // 获取分页页码
        let len = this.page
        let temp = []
        let list = []
        let count = Math.floor(this.pagegroup / 2)
        let center = this.current
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len})
          }
          return temp
        }
        while (len--) {
          temp.push(this.page - len)
        }
        let idx = temp.indexOf(center)
        if (idx < count)
          center = center + count - idx
        if (this.current > this.page - count)
          center = this.page - count
        temp = temp.splice(center - count - 1, this.pagegroup)
        do {
          let t = temp.shift()
          list.push({
            text: t,
            val: t
          })
        } while (temp.length)
        if (this.page > this.pagegroup) {
          if (this.current > count + 1){
            list.unshift({text: '...', val: list[0].val - 1})
          }
          if (this.current < this.page - count) 
            list.push({text: '...', val: list[list.length - 1].val + 1})
        }
        return list
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current !== idx && idx > 0 && idx < this.page + 1) {
          this.current = idx
          this.$emit('pagechange', this.current)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
  .pagination
    overflow hidden
    display table
    margin 0 auto
    /*width 100%*/
    height 50px
  li
    float left
    height 30px
    border-radius 5px
    margin 3px
    color #666666
    animation all .6s linear
    &:hover
      background $color-team-sii
      a
        color #FFFFFF
  a
    display block
    width 30px
    height 30px
    text-align center
    line-height 30px
    font-size 12px
    border-radius 5px
    text-decoration none    
    .active
      color #FFFFFF
      background $color-team-sii
</style>
