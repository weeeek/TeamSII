/* 各成员媒体号 */
import { server } from 'config/common'
import axios from 'axios'

export function getMemberData () {
  return axios.get(`${server}memberData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}
