import { getLyric, getVKey } from 'api/song'
import { getUid } from './uid'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

let urlMap = {}

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url, play}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.play = play
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
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          // console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
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
    image: musicData.image || (musicData.albummid ? { url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`, left: '50%', right: '50%' } : { url: `https://weeeek.github.io/TeamSII/dist/static/images/flag.jpg`, left: '50%', right: '50%' }),
    url: musicData.url,
    play: musicData.play
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return 'SNH48'
  }
  // singer.forEach((s) => {
  //   ret.push(s.name)
  // })
  return ret.join('/')
}

export function isValidMusic (musicData) {
  return musicData.id && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}
