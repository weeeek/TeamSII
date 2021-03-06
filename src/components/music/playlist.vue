<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <scroll
          ref="listContent"
          :data="sequenceList"
          class="list-content"
          :refreshDelay="refreshDelay"
        >
          <!--<draggable v-model="dragList" @change="dragChange"> -->
            <transition-group ref="list" name="list" tag="ul">
              <li
                :key="item.id"
                class="item"
                :class="getCurrentIcon(item)"
                v-for="(item, index) in sequenceList"
                @click="selectItem(item, index)"
              >
                <span @click.stop="toggleFavorite(item)" class="like">
                  <jam-heart
                    :fillColor="'#FF0000'"
                    v-show="!isFavorite(item)"
                  />
                  <jam-heart-f
                    :fillColor="'#FF0000'"
                    v-show="isFavorite(item)"
                  />
                </span>
                <span class="text" v-html="item.name"></span>
                <span @click.stop="deleteOne(item)" class="delete">
                  <jam-delete :fillColor="fillColor" />
                </span>
              </li>
            </transition-group>
          <!--</draggable> -->
        </scroll>
        <div class="list-header">
          <h1 class="title">
            <jam-repeat
              :fillColor="fillColor"
              v-show="this.mode == 1"
              @click="changeMode"
            />
            <jam-shuffle
              :fillColor="fillColor"
              v-show="this.mode == 2"
              @click="changeMode"
            />
            <jam-ordered-list
              :fillColor="fillColor"
              v-show="this.mode == 0"
              @click="changeMode"
            />
            <span class="text">&nbsp;{{ modeText }}</span>
            <!-- <jam-close-circle class="clear" :fillColor="fillColor" @click="hide" /> -->
          </h1>
        </div>
        <!-- <div class="list-operate">
          <div @click="addSong" class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div> -->
        <!-- <div @click="hide" class="list-close">
          <span>关闭</span>
        </div> -->
      </div>
      <!-- <confirm
        ref="confirm"
        @confirm="confirmClear"
        text="是否清空播放列表"
        confirmBtnText="清空"
      ></confirm>
      <add-song ref="addSong"></add-song> -->
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapMutations } from "vuex";
// import Draggable from "vuedraggable";
import { playMode } from "common/js/config";
import Scroll from "base/scroll/scroll";
// import Confirm from "base/confirm/confirm";
import AddSong from "components/music/add-song";
import { playerMixin } from "common/js/mixin";

export default {
  mixins: [playerMixin],
  data() {
    return {
      fillColor: "#87cefa",
      showFlag: false,
      refreshDelay: 120,
    };
  },
  computed: {
    dragList: {
      get() {
        return this.sequenceList;
      },
      set() {
        // draggable组件的model需要setter，但是vuex不让直接改这个
      },
    },
    modeText() {
      switch (this.mode) {
        case playMode.sequence:
          return "顺序播放";
        case playMode.random:
          return "随机播放";
        case playMode.loop:
        default:
          return "单曲循环";
      }
    },
  },
  methods: {
    // dragChange(target) {
    // 拖动换顺序，因为父级容器有个scroll导致歌曲多了之后有问题，无期限下架这个功能
    //   this.continuePlay(target)
    // },
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    // showConfirm() {
    //   this.$refs.confirm.show();
    // },
    // confirmClear() {
    //   this.deleteSongList();
    //   this.hide();
    // },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return "current";
      }
      return "";
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(
        this.$refs.list.$el.children[index],
        300
      );
    },
    deleteOne(item) {
      if (item.deleting) {
        return;
      }
      item.deleting = true;
      this.deleteSong(item);
      if (!this.playlist.length) {
        this.hide();
      }
      setTimeout(() => {
        item.deleting = false;
      }, 300);
    },
    addSong() {
      this.$refs.addSong.show();
    },
    ...mapMutations({
      setPlaylist: "SET_PLAYLIST",
    }),
    ...mapActions(["deleteSong", "deleteSongList", "continuePlay"]),
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong);
      }, 20);
    },
  },
  components: {
    Scroll,
    // Confirm,
    AddSong,
    // Draggable,
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  background-color: $color-background-d;

  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  &.list-fade-enter, .list-wrapper {
    position: absolute;
    left: 0;
    bottom: $mini-player-height;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .clear {
          extend-click();

          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }

    .list-content {
      max-height: 440px;
      overflow: hidden;
      padding-top: 10px;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        overflow: hidden;

        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter, &.list-leave-to, .text {
          flex: 1;
          no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .like {
          extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }

        &.current {
          span.text {
            color: $color-team-sii;
          }
        }
      }
    }

    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
