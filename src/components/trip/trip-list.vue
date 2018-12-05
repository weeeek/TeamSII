<template>
  <div class="block">
    <Timeline :timeline-items="timelineItems" :message-when-no-items="messageWhenNoItems" />
  </div>
</template>

<script type="text/ecmascript-6">
import Timeline from 'components/plugin/timeline'
import {tripData} from 'api/config'
// import '../../../node_modules/timeline-vuejs/dist/timeline-vuejs.css'

export default {
  components: {
    Timeline
  },
  data () {
    return {
      messageWhenNoItems: 'There are not any items',
      timelineItems: tripData
    }
  }
}
</script>
