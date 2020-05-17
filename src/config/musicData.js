import { server, webProxyServer } from 'config/common'
import axios from 'axios'
import { getUid } from '../common/js/uid'

export function getMusicData () {
  return axios.get(`${server}musicData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicUrl (mids) {
  if (mids.length > 0) {
    return axios.post(`${webProxyServer}api/QQAudioUrl`, { guid: getUid(), mids: mids }).then((res) => {
      return Promise.resolve(res)
    })
  } else {
    return Promise.resolve({data: { code: -1 }})
  }
}

