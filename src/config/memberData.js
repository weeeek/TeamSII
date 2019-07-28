/* 各成员媒体号 */
import { server } from 'config/common'
import axios from 'axios'

export function getMemberData () {
  return axios.get(`${server}memberData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
