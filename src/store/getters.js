import Song from 'common/js/song'

// 用getter取state的数据
// export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const volume = state => state.volume

// 播放队列，洗牌（shuff）打乱这个队列
export const playlist = state => state.playlist

// 显示队列，拖拽（drag）更改这个队列，同时如果播放模式不是随机，要同步更改playlist
export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  console.log('getter的currentSong', state.playlist[state.currentIndex] && state.playlist[state.currentIndex].name)
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

// export const topList = state => state.topList

// export const searchHistory = state => state.searchHistory

export const playHistory = (state) => {
  return state.playHistory.map((song) => {
    if (song) {
      return new Song(song)
    }
  })
}

export const favoriteList = (state) => {
  return state.favoriteList.map((song) => {
    return new Song(song)
  })
}

export const uploaderShow = (state) => {
  return state.uploaderShow
}

export const uploadType = (state) => {
  return state.uploadType
}
