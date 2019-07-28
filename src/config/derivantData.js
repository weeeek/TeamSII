import { server } from 'config/common'
import axios from 'axios'

export function getDerivantData () {
  return axios.get(`${server}derivantData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
