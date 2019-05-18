<template>
  <div>
    <div class="project-wrap">
      <div class="project-item" v-for="obj in derivantDataFilter" :key="obj.name">
        <carousel v-for="d in obj.derivant" :key="d.name" :per-page="1" :navigate-to="obj.selfLink" :mouse-drag="false">
        <slide v-for="img in d.product.imgs" :key="img" v-if="d.product">
        <div class="project-info" :style="`background-image:url(${img})`">
            <h3 class="project-title text-ellipsis">{{d.name}}</h3>
        </div>
        </slide>
        </carousel>
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
  methods: {},
  computed: {
    derivantDataFilter: function () {
      return derivantData.filter((x)=>{
        if(x.derivant.length > 0){
            console.log(x.derivant)
            return x.derivant
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">    
  @import "~common/stylus/project"
  .project-wrap
    margin-top 15px
</style>
