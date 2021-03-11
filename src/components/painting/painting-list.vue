<template>
  <div id="painting-container">
    <div class="block clearfix">
      <button class="btn-3d btn-upload float-right" @click="upload">上传</button>
      <div class="clearfix"></div>
    </div>
    <div class="waterfall">
      <a
        class="fallitem"
        v-for="(item) in data"
        :key="item.url"
        :title="getAuthor(item.author)"
        @click="view(item)"
      >
        <img v-lazy="item.url" />
      </a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import { mapActions } from "vuex";
import { getPaintingData } from "config/paintingData";
import { mqMixin } from 'common/js/mixin'

export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    getPaintingData().then((res) => {
      this.data = res;
    });
  },
  methods: {
    getAuthor(author) {
      return author ? "作者：" + author : "";
    },
    getWeibo(weibo) {
      return weibo || "javascript:void(0)";
    },
    view(item) {
      this.MQSend(this.mqType.painting, item.url)
      window.open(item.url);
    },
    upload() {
      this.setUploadType("Painting");
      this.triggerUploader();
    },
    ...mapActions(["triggerUploader", "setUploadType"]),
  },
  mixins:[mqMixin]
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/waterfall';
@import '~common/stylus/3dButton';

@media screen and (min-width: 1366px) {
  #painting-container {
    padding-bottom: 15px;
  }
}

@media screen and (max-width: 1366px) {
  #painting-container {
    padding-bottom: 10px;
  }
}
</style>
