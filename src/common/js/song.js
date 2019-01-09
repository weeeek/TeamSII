import { getLyric, getVKey } from 'api/song'
import { getUid } from './uid'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

let urlMap = {}

export default class Song {
  constructor ({songid, songmid, songname, image, url}) {
    this.songid = songid
    this.songmid = songmid
    this.songname = songname
    this.image = image
    this.filename = `C400${this.songmid}.m4a`
    // 固定的src配置
    if (url) {
      urlMap[this.songid] = url
    }
    // 确保一首歌曲的 id 只对应一个 url
    if (urlMap[this.songid]) {
      this.url = urlMap[this.songid]
      console.log(this.url)
    } else {
      // 取url
      this.url = this._genUrl()
    }
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.songmid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
  _genUrl () {
    if (this.url) {
      return this.url
    }
    getVKey(this.songmid, this.filename).then((res) => {
      if (res.code === ERR_OK) {
        const vkey = res.data.items[0].vkey
        // this.url = `http://116.211.73.28/amobile.music.tc.qq.com/${this.filename}?guid=${getUid()}&vkey=${vkey}&uin=0&fromtag=66`
        urlMap[this.songid] = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
        // console.log('url', urlMap[this.songid])
        return urlMap[this.songid]
      }
    })
  }
}

export function createSong (musicData) {
  return new Song({
    songid: musicData.songid,
    songmid: musicData.songmid,
    // singer: filterSinger(musicData.singer),
    songname: musicData.songname,
    // album: musicData.albumname,
    // duration: musicData.interval,
    // image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    image: musicData.image || '/TeamSII/dist/static/images/flag.jpg',
    url: musicData.url || null
  })
}

// function filterSinger (singer) {
//   let ret = []
//   if (!singer) {
//     return ''
//   }
//   singer.forEach((s) => {
//     ret.push(s.name)
//   })
//   return ret.join('/')
// }

export function isValidMusic (musicData) {
  return musicData.songid
}
