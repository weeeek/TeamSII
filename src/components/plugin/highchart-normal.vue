<template>
  <div>
    <div v-if="hasNoData()">
      <p >{{ emptyText }}</p>
    </div>
    <div :id="id" :options="options" v-else></div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';

  export default {
    props: {
      id: {
        type: String
      },
      options: {
        data: {
          required: true,
          type: Array
        },
        colors: {
          type: Array
        },
        option: {
          type: Object
        }
      },
      emptyText: {
        default: '暂无数据'
      }
    },
    data() {
      return {
        option: {
          chart: {
            type: 'column'
          },
          credits: {
            enabled: false
          },
          title: {
            text: null
          },
          xAxis: {
            type: 'category',
            tickWidth: 0
          },
          yAxis: {
            visible: false
          },
          legend: {
            enabled: false
          },
          ...this.config.option,
          plotOptions: {
            column: {
              colorByPoint: true,
              colors: this.config.colors,
              dataLabels: {
                enabled: true
              }
            }
          },
          series: [{
            data: this.config.data
          }]
        }
      };
    },
    methods: {
      hasNoData() {
        if (this.config.data) {
          return this.config.data.length > 0;
        }
        return true;
      }
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
    created() {
    },
    mounted() {
      if (!this.hasNoData()) {
        this.chart = Highcharts.chart(this.id, this.option);
      }
    }
  };
</script>