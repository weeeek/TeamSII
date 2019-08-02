import { server } from 'config/common'
import axios from 'axios'

export function getPaintingData () {
  return axios.get(`${server}paintingData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
    return Promise.resolve(res.data)
  })
}
