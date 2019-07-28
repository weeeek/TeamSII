import { server } from 'config/common'
import axios from 'axios'

export function getTripData () {
  return axios.get(`${server}tripData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}

