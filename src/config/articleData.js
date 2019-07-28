import { server } from 'config/common'
import axios from 'axios'

export function getArticleData () {
  return axios.get(`${server}articleData.json`).then((res) => {
    return Promise.resolve(res.data)
  })
}
