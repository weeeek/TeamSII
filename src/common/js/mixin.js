import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode() {
      switch (this.mode) {
        case playMode.sequence:
          return 'icon-sequence'
        case playMode.random:
          return 'icon-random'
        case playMode.loop:
        default:
          return 'icon-loop'
      }
    },
    ...mapGetters([
      'sequenceList',
      'playlist',
      'currentSong',
      'mode',
      'favoriteList'
    ]),
    favoriteIcon() {
      return this.getFavoriteIcon(this.currentSong)
    }
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id && item.mid === this.currentSong.mid
      })
      console.log(index)
      this.setCurrentIndex(index)
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id && item.mid === song.mid
      })
      return index > -1
    },
    ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      // 处理带空格的情况
      this.query = query.trim().toLowerCase()
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}

export const trasferMixin = {
  methods: {
    getVideoPlayUrl(videoinfo) {
      switch (videoinfo.from) {
        case `BV`:
          return `https://www.bilibili.com/video/BV${videoinfo.url}`
        case `B`:
          return `https://www.bilibili.com/video/av${videoinfo.url}`
        case `Q`:
          return `https://v.qq.com/detail/s/${videoinfo.url}.html`
        case `S`:
          return `https://tv.sohu.com/${videoinfo.url}`
        case `I`:
          return `https://www.iqiyi.com/${videoinfo.url}.html`
        case `W`:
          return `https://weibo.com/p/${videoinfo.url}`
        case `Y`:
          return `https://v.youku.com/v_show/id_${videoinfo.url}.html`
        case `Server`:
          return `http://47.97.248.244/static/${videoinfo.url}`
        default:
          return videoinfo.url
      }
    }
  },
}