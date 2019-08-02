import { server } from 'config/common'
import axios from 'axios'

export function getRecommendData () {
  return axios.get(`${server}recommendData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}
