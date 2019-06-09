<template>
  <div id="derivant-container">
    <div class="project-wrap">
      <div class="project-item" v-for="obj in derivantDataFilter" :key="obj.name">
        <div v-for="d in obj.derivant" :key="d.name">
          <carousel :per-page="1" :navigate-to="d.selfLink" :mouse-drag="false" :paginationPadding="0" :paginationMargin="0" :autoplay="true" :adjustableHeight="true" :loop="true" v-if="d.product">
            <slide v-for="img in d.product.imgs" :key="img">
              <div class="project-info" :style="`background-image:url(${img})`">
                <h3 class="project-title text-ellipsis">{{d.name}}</h3>
              </div>
            </slide>
          </carousel>
          <div class="text-center text-derivant">
            ￥{{ toMoney(d.product.minPrice) }} - {{ toMoney(d.product.maxPrice) }}
          </div>
          <div class="text-center ">
            <a class="btn btn-orange" :href="d.selfLink" target="_blank">购买</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { derivantData } from 'config/derivantData'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  data () {
    return { }
  },
  watch:{ },
  mounted () { },
  methods: {
    toMoney (value) {
      return (value / 100).toFixed(2)
    }
  },
  computed: {
    derivantDataFilter: function () {
      return derivantData.filter((x)=>{
        if(x.derivant.length > 0){          
          return x.derivant[0]
          //return x.derivant[0] && new Date(x.derivant[0].endTime) > new Date()
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">    
  @import "~common/stylus/project"

  .text-derivant
    margin 1em auto
    color #FF5041
    font-weight bolder

  @media screen and (min-width 1366px)
    #derivant-container
      padding-bottom 15px
 
  @media screen and (max-width 1366px)
    #derivant-container
      padding-bottom 10px

  @media screen and (min-width 1024px)
    .project-wrap
      -moz-column-count 3
      -webkit-column-count 3
      column-count 3

  .project-wrap
    margin-top 15px
    .project-item
      .project-info
        background-size contain    
        width 100%
        height 400px
        line-height 400px
        margin-bottom 10px
</style>
