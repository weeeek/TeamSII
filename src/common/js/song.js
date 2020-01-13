import {
  getLyric,
  getVKey
} from 'api/song'
import {
  getUid
} from './uid'
import {
  ERR_OK
} from 'config/common'
import {
  Base64
} from 'js-base64'

let urlMap = {}

export default class Song {
  constructor ({ id, mid, singer, name, album, duration, image, url, play, opern, lyric }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.play = play
    this.opern = opern

    this.lyric = lyric
    this.lyricTranslated = false
    // 确保一首歌曲的 id 只对应一个 url
    if (urlMap[this.id]) {
      this.url = urlMap[this.id]
    } else if (url) {
      urlMap[this.id] = url
      this.url = urlMap[this.id]
    } else {
      this._genUrl()
    }
  }

  getLyric () {
    var ids = [125380668, 20181111]
    if (!this.lyricTranslated && ids.includes(this.id)) {
      this.lyric = Base64.decode(this.lyric)
      this.lyricTranslated = true
    }
    // 已加载歌词的
    if (this.lyricTranslated) {
      return Promise.resolve(this.lyric)
    }
    // 手动歌词
    if (this.lyric && this.mid == null) {
      // 非QQ音乐，手动加载歌词
      this.lyric = Base64.decode(this.lyric)
      this.lyricTranslated = true
      return Promise.resolve(this.lyric)
    }
    // 非手动歌词，必须要有mid
    if (this.mid) {
      return new Promise((resolve, reject) => {
        getLyric(this.mid).then((res) => {
          if (res.retcode === ERR_OK) {
            this.lyric = Base64.decode(res.lyric)
            this.lyricTranslated = true
            resolve(this.lyric)
          } else {
            reject('no lyric')
          }
        })
      })
    } else {
      return Promise.resolve(null)
    }
  }

  _genUrl () {
    if (this.url) {
      return
    }
    getVKey(this.mid, this.filename).then((res) => {
      if (res.code === ERR_OK) {
        const vkey = res.data.items[0].vkey
        this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
        urlMap[this.id] = this.url
      }
    })
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.albumname || 'SNH48 Team SII',
    duration: musicData.interval || 200,
    image: musicData.image || (musicData.albummid ? {
      url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
      left: '50%',
      right: '50%'
    } : {
      url: `http://47.97.248.244/static/images/flag.jpg`,
      left: '50%',
      right: '50%'
    }),
    url: musicData.url,
    play: musicData.play,
    opern: musicData.opern,
    lyric: musicData.lyric
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return 'SNH48'
  }
  singer.forEach((s) => {
    ret.push(s)
  })
  return ret.join('，')
}
