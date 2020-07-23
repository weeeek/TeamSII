<template>
  <div id="film-container" class="flex flex-column">
    <div class="block">
      <div class="search">
        <search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></search>
      </div>
    </div>
    <div class="waterfall flex-grow">
      <a
        :href="getVideoPlayUrl(item)"
        target="_blank"
        class="fallitem"
        v-for="(item) in filmFilter"
        :key="item.title"
        :title="item.title"
      >
        <img v-lazy="item.img" :alt="item.title" :title="item.title" />
        <h2>{{ item.title }}</h2>
      </a>
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
      return this.DataList.filter(y => {
        return y.title.toLowerCase().includes(query);
      });
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
