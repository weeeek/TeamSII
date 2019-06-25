<template>
  <section class="timeline">
    <div class="wrapper-timeline" v-if="queryTimelineItems.length > 0">
      <div
        class="wrapper-item"
        v-for="(timelineContent, timelineIndex) in queryTimelineItems"
        :key="timelineIndex">
        <div class="section-year" v-if="timelineContent.items.length > 0">
          <p class="year">
            {{ timelineContent.year.to }}
          </p>
          <p class="year">
            {{ timelineContent.year.from }}
          </p>
        </div>
        <section class="timeline-items" v-if="timelineContent.items.length > 0">
          <a :href="getUrl(item.url)" target="_blank" :title="item.summarize"
            class="item"
            v-for="(item, index) in timelineContent.items"
            :key="index">
            <span class="dot" :class="getClass(item.type)"></span>
            <h3 class="month-item">{{ item.nameMonth }}</h3>
            <h4 class="title-item" v-html="item.title"></h4>
            <p class="description-item" v-html="splitDescription(item.description)"></p>
          </a>
        </section>
      </div>
    </div>
    <p v-else>{{ messageWhenNoItems }}</p>
  </section>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    timelineItems: {
      type: Array,
      default: () => []
    },
    messageWhenNoItems: {
      type: String
    },
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    getClass(type){
      return 'dot-' + type
    },
    getUrl (url) {
      if (url.length === 0) {
        return 'javascript:void(0)'
      } else {
        return url
      }
    },
    splitDescription (str) {
      return str.split(',').join('<br>')
    },
  },
  mounted () {

  },
  computed: {
    queryTimelineItems () {
      let data = []
      let queryArr = [];
      if (this.query) {
        //同时包含
        if(this.query.includes("+")){
          queryArr = this.query.trim().split('+')
          this.timelineItems.map((x, xindex)=>{
            data.push({
              year: x.year,
              items: []
            })
            x.items.map((y)=>{
              let index = 0
              let allmatch = true
              let target = Object.assign({}, y)      
              while (index < queryArr.length && allmatch){
                //匹配这一个关键词
                if (y.title.includes(queryArr[index]) || y.description.includes(queryArr[index])){
                  //替换文本
                  target.title = target.title.replace(queryArr[index], '<span class="keywords">' + queryArr[index] + '</span>')
                  target.description = target.description.replace(queryArr[index], '<span class="keywords">' + queryArr[index] + '</span>')
                }
                else{
                  allmatch = false
                }
                ++index
              }
              if(allmatch)
                data[xindex].items.push(target)
            })
          })
        }
        else{
          //关键字分割的关键字数组
          queryArr = this.query.trim().split(' ')
          this.timelineItems.map((x, xindex)=>{
            data.push({
              year: x.year,
              items: []
            })
            x.items.map((y)=>{
              let index = 0
              let target = Object.assign({}, y)
              let match = false
              while (index < queryArr.length){
                if (y.title.includes(queryArr[index]) || y.description.includes(queryArr[index])){
                  match = true
                  target.title = target.title.replace(new RegExp(queryArr[index],"gm"), `<span class="keywords">${queryArr[index]}</span>`)
                  target.description = target.description.replace(new RegExp(queryArr[index],"gm"), `<span class="keywords">${queryArr[index]}</span>`)
                }
                ++index
              }
              if(match)
                data[xindex].items.push(target)
            })
          })
        }        
      }
      else{
        data = this.timelineItems
      }
      return data
    }
  },
  watch: {
    query (oldValue, newValue) {
      
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.timeline
  text-align left
  width 100%
  .wrapper-timeline
    position relative
  .wrapper-item
    display grid
    margin-bottom 20px
    .section-year
      display flex
      flex-direction column
      justify-content space-between
      align-items flex-end
      font-weight bold
      .year
        margin 0
    .timeline-items
      .item
        display block
        border-left 5px solid #ccd5db
        padding 20px 0 20px 15px
        position relative
        &:hover
          .dot
            width 30px
            height 30px
            left -18px
            top 18px
      .month-item
        margin 0
        text-transform uppercase
      .title-item
        margin 0
        font-weight 800
      .description-item
        font-weight 100
        margin 0
        line-height 1.4em
      .dot
        display block
        position absolute
        width 15px
        height 15px
        border-radius 50%
        background $color-team-sii
        left -10px
        top 26px
        transition all ease-in-out 0.3s
      .dot-blue
        background $color-team-sii
      .dot-red
        background #ff2471
      .dot-green
        background #a9cc29
      .dot-orange
        background #f39800
      .dot-gray
        background #c3c3c3
      .dot-sea
        background #006ab7
      .dot-black
        background #000000
        
@media screen and (min-width 1366px)
  .wrapper-item
    grid-template-columns 100px 1fr
    .section-year
      margin 20px auto
      font-size 20px  
    .timeline-items    
      .month-item
        font-size 18px
        letter-spacing 2px
      .title-item
        padding 5px 0
        font-size 16px
      .description-item
        font-size 14px
@media screen and (max-width 1366px)
  .wrapper-item
    grid-template-columns 80px 1fr
    .section-year
      margin 20px auto
      font-size 20px  
    .timeline-items    
      .month-item
        font-size 14px
        letter-spacing 1px
      .title-item
        padding 5px 0
        font-size 14px
      .description-item
        font-size 12px
</style>
