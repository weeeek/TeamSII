import { commonParams, options } from './config'
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric (mid, fn) {
  const url = debug ? '/api/lyric' : 'http://ustbhuangyi.com/music/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'jsonp'
  })

  return axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getVKey (songmid, filename) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  })

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}
