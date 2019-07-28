import { server } from 'config/common'
import axios from 'axios'

export function getEntertainmentData () {
  return axios.get(`${server}entertainmentData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
