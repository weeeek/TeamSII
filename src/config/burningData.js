import { server } from 'config/common'
import axios from 'axios'

export function getBurningData () {
  return axios.get(`${server}burningData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
