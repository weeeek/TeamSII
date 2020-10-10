/* 各成员媒体号 */
import { webProxyServer } from 'config/common'
import axios from 'axios'

export function getVideoData (id) {
  return axios.get(`${webProxyServer}api/GetVideoOption?id=${id}`).then((res) => {
    return Promise.resolve(res.data)
  })
}
