import { server } from 'config/common'
import axios from 'axios'

export function getRecommendData () {
  return axios.get(`${server}recommendData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
