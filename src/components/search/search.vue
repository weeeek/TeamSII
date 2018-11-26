<template>
  <div class="block">
    <iframe :src="`https://www.baidu.com`" id="baidu"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return { }
  }
}
</script>

<style scoped>
#baidu{
  width: 100%;
  border: none;
  overflow: none;
  height: 2858px;
}
</style>
