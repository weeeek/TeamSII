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
      // 有歌曲地址了
      urlMap[this.id] = url
      this.url = urlMap[this.id]
    } else {
      // 需要获取歌曲地址
      // this.url = null
      // this._genUrl()
      // this.getUrl()
    }
  }

  getLyric () {
    // 特别处理歌词对不上，手动解码，支柱
    var ids = [125380668]
    if (!this.lyricTranslated && ids.includes(this.id)) {
      this.lyric = Base64.decode(this.lyric)
      this.lyricTranslated = true
    }
    // 已加载歌词的
    if (this.lyricTranslated) {
      return Promise.resolve(this.lyric)
    }
    // 手动歌词
    if (this.lyric) {
      // 非QQ音乐，手动加载歌词
      this.lyric = Base64.decode(this.lyric)
      this.lyricTranslated = true
      return Promise.resolve(this.lyric)
    }
    // 非手动歌词，必须要有mid
    if (this.mid) {
      return new Promise((resolve, reject) => {
        getLyric(this.id, this.mid).then((res) => {
          if (res.retcode === ERR_OK) {
            // Base64解码
            this.lyric = Base64.decode(res.lyric)
            // html解码
            // this.lyric = this.unescapeHTML(res.lyric)
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
  unescapeHTML (lrc) {
    var t = document.createElement('div')
    t.innerHTML = lrc + ''
    return t.innerText
  }
  _genUrl () {
    if (this.url) {
      return
    }

    let guid = getUid()

    getVKey(this.mid, guid).then((res) => {
      if (res.code === ERR_OK) {
        const vkey = res.req.data.vkey
        // this.url = `https://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${this.mid}.m4a?guid=${guid}&vkey=${vkey}&uin=0&fromtag=38`
                        this.url = `http://isure.stream.qqmusic.qq.com/C400${this.mid}.m4a?guid=${guid}&vkey=${vkey}&uin=0&fromtag=38`
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
