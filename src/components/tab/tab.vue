<template>
  <div class="tab">
    <!-- <keep-alive>
      <router-link tag="div" class="tab-item" to="/dynamic">
        <span class="tab-link">动态</span>
      </router-link>
    </keep-alive>-->
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/article">
        <span class="tab-link">文章</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/painting">
        <span class="tab-link">手绘</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/emoji">
        <span class="tab-link">表情包</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/music">
        <span class="tab-link">歌曲</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/trip">
        <span class="tab-link">行程</span>
      </router-link>
    </keep-alive>
    <!-- <keep-alive>
      <router-link tag="div" class="tab-item" to="/live">
        <span class="tab-link">直播</span>
      </router-link>
    </keep-alive>-->
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/raise">
        <span class="tab-link">集资</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/derivant">
        <span class="tab-link">周边</span>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link tag="div" class="tab-item" to="/entertainment">
        <span class="tab-link">赛事</span>
      </router-link>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@media screen and (min-width: 1366px) {
  .tab {
    border-top: 1px solid #f2f2f5;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    display: flex;
    height: 40px;
    line-height: 40px;
    flex-direction: row;

    .tab-item {
      flex-grow: 1;
      text-align: center;
      text-decoration: none;
      color: #2c3e50;

      .tab-link {
        cursor: pointer;
        font-weight: bolder;
        padding: 0 15px 5px 15px;
      }
    }

    &.router-link-active {
      .tab-link {
        border-bottom: 5px solid $color-team-sii;
      }
    }
  }
}

@media screen and (max-width: 1366px) and (min-width: 768px) {
  .tab {
    border-top: 1px solid #f2f2f5;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    display: flex;
    height: 32px;
    line-height: 32px;
    flex-direction: row;

    .tab-item {
      flex-grow: 1;
      text-align: center;
      text-decoration: none;
      color: #2c3e50;

      .tab-link {
        cursor: pointer;
        font-weight: bolder;
        padding: 0 6px 2px 6px;
        font-size: 16px;
      }
    }

    &.router-link-active {
      .tab-link {
        border-bottom: 2px solid $color-team-sii;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .tab {
    border-top: 1px solid #f2f2f5;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    display: flex;
    height: 22px;
    line-height: 22px;
    flex-direction: row;

    .tab-item {
      flex-grow: 1;
      text-align: center;
      text-decoration: none;
      color: #2c3e50;

      .tab-link {
        cursor: pointer;
        font-weight: bolder;
        padding: 0 6px 2px 6px;
        font-size: 12px;
      }
    }

    &.router-link-active {
      .tab-link {
        border-bottom: 2px solid $color-team-sii;
      }
    }
  }
}
</style>
