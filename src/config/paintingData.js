import { server } from 'config/common'
import axios from 'axios'

export function getPaintingData () {
  return axios.get(`${server}paintingData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
