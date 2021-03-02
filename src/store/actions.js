import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
// import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'
import { savePlay, saveFavorite, deleteFavorite } from 'common/js/cachenew'
import { findIndex } from 'common/js/util'

// 
export const continuePlay = function ({ commit, state }, target) {
  let playlist = state.playlist.slice()
  // 当前歌曲的播放序号
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]

  console.log("应该继续播放的歌曲", currentSong.name)

  // slice 从某个已有的数组返回选定的元素，这里是创建一个数组副本
  let sequenceList = state.sequenceList.slice()

  console.log(
    "origin list",
    sequenceList.map((x) => x.name)
  );

  // 旧位置删除
  sequenceList.splice(target.moved.oldIndex, 1);
  // 新位置添加
  sequenceList.splice(target.moved.newIndex, 0, target.moved.element);

  // 更新播放队列
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  // 如果不是随机播放，就要同步更新播放队列
  if(state.mode !== playMode.random){
    commit(types.SET_PLAYLIST, sequenceList)
  }
  // 在新播放队列里找刚刚播放的歌
  var index = findIndex(sequenceList, currentSong)
  console.log(index)

  console.log("实际播放", sequenceList[index].name)

  commit(types.SET_CURRENT_INDEX, index)
}

export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({ commit, state }, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSongIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSongIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSongIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  // 播放不全屏
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}

// export const saveSearchHistory = function ({commit}, query) {
//   commit(types.SET_SEARCH_HISTORY, saveSearch(query))
// }

// export const deleteSearchHistory = function ({commit}, query) {
//   commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
// }

// export const clearSearchHistory = function ({commit}) {
//   commit(types.SET_SEARCH_HISTORY, clearSearch())
// }

export const deleteSong = function ({ commit, state }, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

export const deleteSongList = function ({ commit }) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function ({ commit }, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function ({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function ({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}

export const changeVolume = function ({ commit }, num) {
  console.log(num)
  commit(types.SET_VOLUME, num)
}

export const insertFavoriteSong = function ({ commit, state }, song) {
  if (!song) {
    return
  }
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSongIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSongIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSongIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, 0)
  // 播放不全屏
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}

export const triggerUploader = function ({ commit }) {
  commit(types.TRIGGER_UPLOADER)
}

export const setUploadType = function ({ commit, state }, type) {
  console.log(type)
  commit(types.UPLOAD_TYPE, type)
}