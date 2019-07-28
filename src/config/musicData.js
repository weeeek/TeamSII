import { server } from 'config/common'
import axios from 'axios'

export function getMusicData () {
  return axios.get(`${server}musicData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
