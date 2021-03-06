import * as types from './mutation-types'

// 相关的修改方法，state:当前状态树（state.js）
// 通常有mutation-type做关联
const mutations = {
  // [types.SET_SINGER] (state, singer) {
  //   state.singer = singer
  // },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_VOLUME](state, num) {
    state.volume = num
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    console.log("changed list", list.map((x) => x.name));
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  // [types.SET_TOP_LIST] (state, topList) {
  //   state.topList = topList
  // },
  // [types.SET_SEARCH_HISTORY] (state, history) {
  //   state.searchHistory = history
  // },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  [types.TRIGGER_UPLOADER](state) {
    state.uploaderShow = !state.uploaderShow
  },
  [types.UPLOAD_TYPE](state, type) {
    state.uploadType = type
  }
}

export default mutations
