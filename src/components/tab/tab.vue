<template>
  <div class="tab">
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/dynamic">
        <span class="tab-link">动态</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/video">
        <span class="tab-link">视频</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/article">
        <span class="tab-link">同人文</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/painting">
        <span class="tab-link">手绘</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <a class="tab-item" href="http://www.baidu.com" target="_blank">
        <span class="tab-link">歌曲</span>
      </a>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/trip">
        <span class="tab-link">行程</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/raise">
        <span class="tab-link">集资</span>
      </router-link>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    border-top: 1px solid #f2f2f5
    box-shadow: 0 1px 1px rgba(0,0,0,0.15)
    background-color: #FFF
    display: flex
    height: 40px
    line-height: 40px
    font-size: $font-size-medium4
    .tab-item
      flex: 1
      text-align: center
      text-decoration: none
      color: #2c3e50
      .tab-link
        cursor: pointer
        font-weight: bolder
        padding: 0 15px 5px 15px
      &.router-link-active
        .tab-link
          border-bottom: 5px solid $color-team-sii
</style>
