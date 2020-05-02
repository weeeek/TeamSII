import { commonParams, options } from 'config/common'
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric (mid, fn) {
  // const url = debug ? '/api/lyric' : 'http://ustbhuangyi.com/music/api/lyric'
  // https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1588404021470&songmid=003saTQe0SySHp&g_tk_new_20200303=169418026&g_tk=169418026&loginUin=407351071&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
  const url = debug ? 'api/lyric' : 'http://47.97.248.244/WebProxy/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

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
