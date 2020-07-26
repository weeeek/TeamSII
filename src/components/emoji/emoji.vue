<template>
  <div id="emoji-container">
    <div class="block flex">
      <button
        class="btn-3d"
        onclick="window.open(`https://weibo.com/p/10080895b3a71856d76c4435c477e4ac01e57a/super_index`)"
      >#勇气重生419#</button>
      <button
        class="btn-3d"
        onclick="window.open(`https://weibo.com/p/100808eaa925a8fccc2a30cfcc7079d5e4fbc1/super_index`)"
      >#艾斯兔表情包#</button>
      <div class="flex-grow">
        <button class="btn-3d float-right" @click="triggerUploader">上传</button>
      </div>
    </div>
    <div class="block flex">
      <div class="search flex-grow">
        <search :placeholder="'搜索关键字（用单英文空格分隔）'" @query="onQueryChange"></search>
      </div>
    </div>
    <div class="waterfall">
      <a
        href="javascript:void(0)"
        class="fallitem"
        v-for="(item) in emojiFilter"
        :key="item"
        @click="view(item)"
      >
        <img v-lazy="calcPath(item)" />
      </a>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import { mapActions } from "vuex";
import { getEmojiData } from "config/emojiData";
import Search from "components/plugin/search";
import { searchMixin } from "common/js/mixin";

export default {
  mixins: [searchMixin],
  components: {
    Search,
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    getEmojiData().then((res) => {
      this.data = res;
    });
  },
  methods: {
    calcPath(url) {
      return "http://47.97.248.244/static/emoji/" + url;
    },
    view(item) {
      window.open(this.calcPath(item));
    },
    upload() {
      this.setUploadType("Emoji");
      this.triggerUploader();
    },
    ...mapActions(["triggerUploader", "setUploadType"]),
  },
  computed: {
    emojiFilter() {
      var query = this.query.trim().toLowerCase();
      if (!query) {
        return this.data;
      }
      return this.data.filter((fileName) => {
        return fileName.toLowerCase().includes(query);
      });
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/waterfall';
@import '~common/stylus/3dButton';

@media screen and (min-width: 1366px) {
  #emoji-container {
    padding-bottom: 15px;

    button {
      font-size: 20px;
      line-height: 20px;
      height: 40px;
    }
  }
}

@media screen and (max-width: 1366px) {
  #emoji-container {
    padding-bottom: 10px;

    button {
      font-size: 12px;
      line-height: 12px;
      height: 24px;
    }
  }
}
</style>
