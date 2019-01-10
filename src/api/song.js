import { commonParams, options } from './config'
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'

// const debug = process.env.NODE_ENV !== 'production'
const debug = false

export function getLyric (mid) {
  const url = debug ? '/api/lyric' : 'http://ustbhuangyi.com/music/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return jsonp(url, data)
  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
}

// 这个不让跨域
export function getLyc (songid) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg'
  const data = Object.assign({}, {
    nobase64: 1,
    musicid: songid,
    '-': 'jsonp1',
    g_tk: '2090557760',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })

  return jsonp(url, data, Object.assign({}, options))
}

export function getVKey (songmid, filename, guid = getUid()) {
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
    guid: guid,
    fromtag: 66
  })

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}

export function getUrl (songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({
    data: {
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: {
          guid: '7709763462',
          calltype: 0,
          userip: ''
        }
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '7709763462',
          songmid: [songmid],
          songtype: [0],
          uin: 0,
          loginflag: 1,
          platform: 20
        }
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 20,
        cv: 0
      }
    }
  }, {
    '-': 'getplaysongvkey5774304561154315',
    g_tk: '5381',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url, {
    headers: {
      authority: 'u.y.qq.com',
      // referer: '',
      scheme: 'https',
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9',
      host: 'u.y.qq.com',
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/portal/player.html',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
    },
    params: data
  })
}

export function getToken (songmid) {
  const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg`
  const data = {
    format: 'json205361747',
    platform: 'yqq',
    cid: 0,
    songmid: songmid,
    filename: `C400${songmid}.m4a`,
    guid: getUid()
  }
  return axios.get(url, {
    params: data
  })
}

// export function getHQUrl () {
//   const guid = '20D919A4D7700FBC424740E8CED80C5F'
//   const url = `http://59.37.96.220/base/fcgi-bin/fcg_musicexpress2.fcg?version=12&miniversion=92&key=19914AA57A96A9135541562F16DAD6B885AC8B8B5420AC567A0561D04540172E&guid=${guid}`

// }
