<template>
  <div class="block">
    <!-- <iframe src="https://teamsii.top" id="raise"></iframe> -->
    <div v-for="m in modianDatas" :key="m.id">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {raiseConfig,modianApi} from 'api/config'
import jQuery from 'jquery'


export default {
  name: 'VideoList',
  data () {
    return {
      modianDatas: []
    }
  },
  methods: {
    initProject (response) {
      console.log('data',JSON.parse(response.data))
    }
  },
  created () {    
    raiseConfig.map((y)=>{
      jQuery.post(`${modianApi}`, { to_user_id: y.id }, function (response) {
        let json = JSON.parse(response)
        let data = JSON.parse(json.data)        
        console.log("data",data)
        })
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#raise
  width 100%
  border none
  overflow none
  height calc(100vh - 362px)
  #header
    display none
  .flat-footer
    display none
</style>
