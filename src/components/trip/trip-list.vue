<template>
  <div class="block">
    <Timeline :timeline-items="timelineItems" :message-when-no-items="messageWhenNoItems" />
  </div>
</template>

<script type="text/ecmascript-6">
import Timeline from 'components/plugin/timeline'
import {tripData} from 'api/config'
import {formatDate} from 'common/js/date'
import jQuery from 'jquery'

export default {
  components: {
    Timeline
  },
  data () {
    return {
      messageWhenNoItems: 'There are not any items',
      timelineItems: tripData
    }
  },
  created () {
  },
  methods: {
    getYearMonth(){
      let now = new Date()
      return now.getFullYear() + `-` + (now.getMonth() + 1)
    },
    formatDate (time) {
      return formatDate(new Date(time), 'MM月dd日 HH:mm')
    }
  }
}
</script>
