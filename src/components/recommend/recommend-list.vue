<template>
  <div id="recommend-container">
    <div class="video-block" v-for="item in dataList" :key="item.type">
      <div class="video-type" @click="item.show = !item.show">
        {{ item.type }}
        <span class="float-right" :title="item.show ? '收起' : '展开'">
          <jam-minus-rectangle :width="20" v-show="item.show" />
          <jam-plus-rectangle :width="20" v-show="!item.show" />
        </span>
      </div>
      <div
        class="video-list flex flex-wrap flex-justify-between"
        v-show="item.show"
      >
        <a
          class="video-detail flex-l-4 flex-m-3 flex-s-2 flex-xs-1"
          target="_blank"
          :href="getVideoPlayUrl(v)"
          v-for="(v, i) in item.list"
          :key="i"
          @click="MQSend(mqType.recommend, item.type + v.title)"
        >
          <img v-lazy="v.img" :style="getStyle(v)" />
          <h3 class="video-title text-ellipsis">{{ v.title }}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommendData } from "config/recommendData";
import { trasferMixin, mqMixin } from "common/js/mixin";

export default {
  name: `RecommendList`,
  created() {
    getRecommendData().then((res) => {
      res.forEach((e) => {
        e.show = true;
      });
      this.dataList = res;
    });
  },
  methods: {
    getStyle(v) {
      if (v.fit) {
        return `object-fit: ${v.fit};object-position: ${v.position}`;
      }
    },
    getVideoImage(videoinfo) {
      return videoinfo.img;
    },
    getUrl(obj) {
      if (obj.url) {
        return obj.url;
      }
      return "javascript:void(0)";
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
  mixins: [trasferMixin, mqMixin],
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/screen';

#recommend-container {
  width: 100%;
  height: 100%;

  .video-block {
    border: 1px solid #e5e9ef;
    background: white;
    border-radius: 4px;
    text-align: left;
    overflow: hidden;

    .video-type {
      font-size: 20px;
      font-weight: bolder;
    }

    .video-list {
      width: 100%;

      .video-detail {
        img {
          width: 100%;
          height: 183px;
          box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.75);
        }

        .video-title {
          line-height: 2em;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
}

@media screen and (min-width: 1366px) {
  #recommend-container {
    .video-block {
      &:last-child {
        margin-bottom: 15px;
      }

      padding: 15px 15px 0 15px;
      margin-top: 15px;

      .video-type {
        font-size: 20px;
        margin: 5px 0 0 10px;
      }

      .video-list {
        .video-detail {
          padding: 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 1366px) {
  #recommend-container {
    .video-block {
      padding: 10px 10px 0 10px;
      margin-top: 10px;

      &:last-child {
        margin-bottom: 10px;
      }

      .video-type {
        margin: 5px 0 0 5px;
      }

      .video-list {
        .video-detail {
          padding: 5px;
        }
      }
    }
  }
}
</style>
