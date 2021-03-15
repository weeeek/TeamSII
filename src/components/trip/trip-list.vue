<template>
  <div class="block">
    <div class="search">
      <trip-search
        :placeholder="'搜索成员、关键字（用单英文空格分隔），使用“+”同时查询关键字'"
        @query="onQueryChange"
      ></trip-search>
      <div class="flex flex-start legend">
        <div class="trip-legend flex-grow">
          公演
          <Switcher
            class="inline-block"
            theme="info"
            :status.sync="blue"
          ></Switcher>
        </div>
        <div class="trip-legend flex-grow">
          通告
          <Switcher
            class="inline-block"
            theme="success"
            :status.sync="green"
          ></Switcher>
        </div>
        <div class="trip-legend flex-grow">
          重要活动
          <Switcher
            class="inline-block"
            theme="danger"
            :status.sync="red"
          ></Switcher>
        </div>
        <div class="trip-legend flex-grow">
          自制节目
          <Switcher
            class="inline-block"
            theme="warning"
            :status.sync="orange"
          ></Switcher>
        </div>
        <div class="trip-legend flex-grow">
          助演
          <Switcher
            class="inline-block"
            theme="sup"
            :status.sync="yellow"
          ></Switcher>
        </div>
      </div>
    </div>
    <Timeline
      :timeline-items="fileItems"
      :message-when-no-items="messageWhenNoItems"
      :query="query"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import Timeline from "components/plugin/timeline";
import TripSearch from "components/plugin/search";
import { getTripData } from "config/tripData";
import { searchMixin } from "common/js/mixin";
import Switcher from "components/plugin/switcher";
// 属性.sync 配合子组件 update:属性 更改props属性传值
export default {
  mixins: [searchMixin],
  components: {
    Timeline,
    TripSearch,
    Switcher,
  },
  data() {
    return {
      messageWhenNoItems: "加载中...",
      timelineItems: [],
      fileItems: [],
      blue: true,
      green: true,
      red: true,
      orange: true,
      yellow: true
    };
  },
  created() {
    getTripData().then((res) => {
      this.timelineItems = res;
      this.calc();
    });
  },
  methods: {
    calc() {
      if(this.timelineItems.length > 0){
        let result = []
        this.timelineItems.forEach(x=>{
          result.push(Object.assign({},x))
        })
        
        if (!this.blue)
          result.map((x) => x.items = x.items.filter((y) => y.type != "blue"));
        if (!this.green)
          result.map((x) => x.items = x.items.filter((y) => y.type != "green"));
        if (!this.red)
          result.map((x) => x.items = x.items.filter((y) => y.type != "red"));
        if (!this.orange)
          result.map((x) => x.items = x.items.filter((y) => y.type != "orange"));
        if (!this.yellow)
          result.map((x) => x.items = x.items.filter((y) => y.type != "yellow"));
        
        this.fileItems = result;
      }
    },
  },
  watch: {
    blue() {
      this.calc();
    },
    green() {
      this.calc();
    },
    red() {
      this.calc();
    },
    orange() {
      this.calc();
    },
    yellow() {
      this.calc();
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.search {
  margin-bottom: 20px;
}

.legend {
  margin-top: 10px;
  line-height: 1.4em;
  vertical-align: middle;

  .trip-legend {
    margin-right: 15px;

    .inline-block {
      transform: translateY(4px);
    }
  }
}
</style>
