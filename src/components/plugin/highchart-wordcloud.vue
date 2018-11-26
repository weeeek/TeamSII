<template>
  <div :id="id" :options="options"></div>
</template>

<script type="text/ecmascript-6">
  import Highcharts from 'highcharts'
  import WordCloud from 'highcharts/modules/wordcloud'

  export default {
    name: 'WordCloud',
    props: {
      id: {
        type: String
      },
      options: {
        type: Object
      }
    },
    data () {
      return { }
    },
    mounted () {
      WordCloud(Highcharts)
      Highcharts.chart(this.id, this.options)
    },
    methods: {
      redraw () {
        Highcharts.chart(this.id, this.options)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  textarea
    width: 100%
</style>
