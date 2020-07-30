<template>
  <div id="film-container" class="flex flex-column">
    <div class="block">
      <div class="search">
        <search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></search>
      </div>
    </div>
    <div class="block-transparent" v-for="data in filmFilter">
      <h2 style="margin: .5em 0" v-if="data.list.length > 0">{{data.type}}</h2>
      <div class="waterfall flex-grow">
        <a
          :href="getVideoPlayUrl(item)"
          target="_blank"
          class="fallitem"
          v-for="item in data.list"
          :key="item.title"
          :title="item.title"
        >
          <img v-lazy="item.img" :alt="item.title" :title="item.title" />
          <h2>{{ item.title }}</h2>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getFilmData } from "config/filmData";
import Search from "components/plugin/search";
import { searchMixin, trasferMixin } from "common/js/mixin";

export default {
  data() {
    return {
      DataList: []
    };
  },
  mixins: [searchMixin, trasferMixin],
  components: {
    Search
  },
  mounted() {
    getFilmData().then(res => {
      // 全部数据
      this.DataList = res;
    });
  },
  computed: {
    filmFilter() {
      var query = this.query.trim().toLowerCase();
      if (!query) {
        return this.DataList;
      }
      var queryArr = [];
      var data = [];
      // 同时包含
      if (this.query.includes("+")) {
        queryArr = this.query
          .trim()
          .toLowerCase()
          .split("+");
        this.DataList.map((x, xindex) => {
          data.push({
            type: x.type,
            list: []
          });
          x.list.map(y => {
            let index = 0;
            let allmatch = true;
            let target = Object.assign({}, y);
            while (index < queryArr.length && allmatch) {
              // 匹配这一个关键词
              if (
                !y.actor ||
                y.title.toLowerCase().includes(queryArr[index]) ||
                y.actor.toLowerCase().includes(queryArr[index])
              ) {

              } else {
                allmatch = false;
              }
              ++index;
            }
            if (allmatch) {
              data[xindex].list.push(target);
            }
          });
        });
      } else {
        // 关键字分割的关键字数组
        queryArr = this.query
          .trim()
          .toLowerCase()
          .split(" ");
        this.DataList.map((x, xindex) => {
          data.push({
            type: x.type,
            list: []
          });
          x.list.map(y => {
            let index = 0;
            let target = Object.assign({}, y);
            let match = false;
            while (index < queryArr.length) {
              if (
                !y.actor ||
                y.title.toLowerCase().includes(queryArr[index]) ||
                y.actor.toLowerCase().includes(queryArr[index])
              ) {
                match = true;
              }
              ++index;
            }
            if (match) {
              data[xindex].list.push(target);
            }
          });
        });
      }
      return data
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/waterfall';

.waterfall {
  margin-top: 0;

  .fallitem {
    img {
      display: block;
    }

    h2 {
      font-weight: bold;
      text-align: center;
    }
  }
}

@media screen and (min-width: 1366px) {
  .waterfall {
    -moz-column-count: 4;
    -webkit-column-count: 4;
    column-count: 4;

    .fallitem {
      h2 {
        margin-top: 15px;
        line-height: 20px;
      }
    }
  }
}

@media screen and (max-width: 1366px) and (min-width: 767px) {
  .waterfall {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;

    .fallitem {
      h2 {
        margin-top: 12px;
        line-height: 16px;
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .waterfall {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;

    .fallitem {
      h2 {
        margin-top: 9px;
        line-height: 12px;
        font-size: 12px;
      }
    }
  }
}
</style>
