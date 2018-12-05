<template>
  <div class="global-header">
    <keep-alive>
      <router-link tag="div" class="logo" to="/"></router-link>
    </keep-alive>
    <div class="header-container">
      <div class="header-control">
        <h1 class="title">{{ title }}</h1>
        <button class="btn-orange" disabled>发帖</button>
        <button class="btn-default" disabled>签到</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'GlobalHeader',
    data () {
      return {
        title: 'SNH48 Team SII 资源中心'
      }
    }
  }
</script>