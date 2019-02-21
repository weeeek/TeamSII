import {playMode} from 'common/js/config'
// import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
import {loadPlay, loadFavorite} from 'common/js/cache'

// 当前播放信息
const state = {
  // 歌手
  // singer: {},
  // 正在播放、暂停
  playing: false,
  // 全屏
  fullScreen: false,
  // 音量
  volume: 0.5,
  // 播放列表
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  disc: {},
  // topList: {},
  // searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
