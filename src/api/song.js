import { commonParams, options } from 'config/common'
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric (id, fn) {
  const url = debug ? 'http://localhost/HttpProxy/api/QQlyric' : 'http://47.97.248.244/WebProxy/api/QQlyric'

  const data = {
    nobase64: 1,
    musicid: id,
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }

  return axios.get(url, {
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
