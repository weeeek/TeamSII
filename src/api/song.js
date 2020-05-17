import {
  options
} from 'config/common'
import axios from 'axios'
import jsonp from 'common/js/jsonp'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric (id, mid, fn) {
  const url = debug ? 'http://localhost/HttpProxy/api/QQlyric' : 'http://47.97.248.244/WebProxy/api/QQlyric'

  const data = {
    id: id,
    mid: mid
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getVKey (songmid, guid) {
  const url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
  const data = {
    sign: 'zza7rrstg933vbezgje16df07565064936c5e971bc4ab222ec',
    data: {
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: {
          guid: guid,
          calltype: 0,
          userip: ''
        }
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: guid,
          songmid: [songmid],
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20'
        }
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 24,
        cv: 0
      }
    },
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.com',
    needNewCode: 0
  }
  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}
